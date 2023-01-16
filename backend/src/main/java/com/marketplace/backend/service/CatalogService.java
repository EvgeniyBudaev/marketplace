package com.marketplace.backend.service;

import com.marketplace.backend.dao.CatalogDao;
import com.marketplace.backend.dto.catalog.CatalogConverters;
import com.marketplace.backend.dto.catalog.request.RequestSaveCatalogDto;
import com.marketplace.backend.dto.catalog.response.ResponseSimpleCatalogDto;
import com.marketplace.backend.dto.catalog.response.single.NumberAttributeDto;
import com.marketplace.backend.dto.catalog.response.single.ResponseSingleCatalogDto;
import com.marketplace.backend.exception.ResourceNotFoundException;
import com.marketplace.backend.mappers.catalog.EntityToCatalogDtoMapper;
import com.marketplace.backend.model.Attribute;
import com.marketplace.backend.model.Catalog;
import com.marketplace.backend.model.EAttributeType;
import com.marketplace.backend.model.Paging;
import com.marketplace.backend.model.values.SelectableValue;
import com.marketplace.backend.repository.CatalogRepository;
import org.mapstruct.factory.Mappers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.*;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class CatalogService implements CatalogDao {
    private final EntityToCatalogDtoMapper mapper;

    private final CatalogRepository catalogRepository;
    private final CatalogConverters catalogConverters;
    @PersistenceContext
    private final EntityManager entityManager;

    @Autowired
    public CatalogService(CatalogRepository catalogRepository, CatalogConverters catalogConverters, EntityManager entityManager) {
        this.catalogRepository = catalogRepository;
        this.catalogConverters = catalogConverters;
        this.entityManager = entityManager;
        mapper = Mappers.getMapper(EntityToCatalogDtoMapper.class);
    }

    @Override
    public void save(Catalog catalog) {
        catalogRepository.save(catalog);
    }

    @Override
    public ResponseSingleCatalogDto save(RequestSaveCatalogDto dto) {
        Catalog catalog = catalogConverters.convertRequestSaveCatalogDtoToCatalog(dto);
        catalogRepository.save(catalog);
        return findCatalogByAlias(catalog.getAlias());
    }




    @Override
    public ResponseSingleCatalogDto findCatalogByAlias(String alias){
        TypedQuery<Catalog> catalogQuery =
                entityManager.
                        createQuery("SELECT c from Catalog as c where c.alias=:alias",Catalog.class);
        catalogQuery.setParameter("alias",alias);
        EntityGraph<?> entityGraph = entityManager.getEntityGraph("catalog-with-full-attributes");
        catalogQuery.setHint("javax.persistence.fetchgraph", entityGraph);
        Catalog catalog = catalogQuery.getResultStream()
                .findFirst().orElseThrow(()->new ResourceNotFoundException("Не найден каталог с псевдонимом "+alias));
        ResponseSingleCatalogDto catalogDto= mapper.entityToSingleCatalogDto(catalog);
        TypedQuery<NumberAttributeDto> doubleValueQuery = entityManager
                .createQuery("SELECT distinct new com.marketplace.backend." +
                        "dto.catalog.response.single" +
                        ".NumberAttributeDto(at.id,at.name,at.alias,min (dv.value),max (dv.value)) " +
                        "from Product as p left join p.doubleValues as dv " +
                        "left join dv.attribute as at where p.catalog.id =: catalogId group by at", NumberAttributeDto.class);
        doubleValueQuery.setParameter("catalogId",catalog.getId());
        Set<NumberAttributeDto> listDoubleDto = doubleValueQuery.getResultStream().filter(x->x.getId()!=null).collect(Collectors.toSet());
        TypedQuery<SelectableValue> selectableValueQuery = entityManager
                .createQuery("select distinct sv from Product as p  join p.selectableValues as sv where p.catalog.id=:catalogId", SelectableValue.class);
        selectableValueQuery.setParameter("catalogId",catalog.getId());
        Set<SelectableValue> selectableValues = selectableValueQuery.getResultStream().collect(Collectors.toSet());

        catalogDto.setNumberAttribute(listDoubleDto);
        Set<ResponseSingleCatalogDto.SelectAttributeDto> selectAttributeDtos = new HashSet<>();
        if(catalog.getAttributes()==null){
            return mapper.entityToSingleCatalogDto(catalog);
        }
        List<Attribute> attributeList = catalog.getAttributes()
                .stream().filter(x -> x.getType().equals(EAttributeType.SELECTABLE)).toList();
        for(Attribute attribute: attributeList){
            List<SelectableValue> selValueForAttributes
                    = selectableValues.stream().filter(value -> {
                if(value==null){
                    return false;
                }
                return value.getAttribute().equals(attribute);
            }).toList();
            selectAttributeDtos.add(mapper.entitySelectableValuesToDto(selValueForAttributes,attribute));
        }
        catalogDto.setSelectAttribute(selectAttributeDtos);
        return catalogDto;
    }


    @Override
    public Catalog findEntityByAlias(String alias) {
        return catalogRepository.findCatalogByAlias(alias).
                orElseThrow(()->new ResourceNotFoundException("Каталог с псевдонимом "+alias+" не найден"));
    }

    @Override
    @Transactional
    public Paging<ResponseSimpleCatalogDto> getAll(Integer page, Integer pageSize) {
       TypedQuery<Long> countQuery = entityManager.createQuery("select count (c) from Catalog as c where c.enabled=true", Long.class);
       Integer count = Math.toIntExact(countQuery.getSingleResult());
       TypedQuery<Catalog> resultQuery = entityManager.createQuery("select c from Catalog  as c where c.enabled=true", Catalog.class);
       Paging<ResponseSimpleCatalogDto> result = new Paging<>(count,pageSize,page);
       result.setContent(resultQuery.getResultList()
               .stream().map(ResponseSimpleCatalogDto::new).collect(Collectors.toList()));
       return result;
    }


    @Override
    @Transactional
    public void delete(String alias) {
        TypedQuery<Long> query = entityManager.createQuery("Select count (p.products) from Catalog as p where p.alias=:alias", Long.class);
        query.setParameter("alias",alias);
        int count = Math.toIntExact(query.getSingleResult());
        if(count>0){
            throw  new RuntimeException("Каталог содержит продукты удаление невозможно");
        }
        Query queryDelete = entityManager.createQuery("UPDATE Catalog as c set c.enabled = false where c.alias=:alias");
        queryDelete.setParameter("alias",alias);
        queryDelete.executeUpdate();
    }


}
