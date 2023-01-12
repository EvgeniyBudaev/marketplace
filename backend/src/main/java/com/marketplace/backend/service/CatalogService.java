package com.marketplace.backend.service;

import com.marketplace.backend.dao.CatalogDao;
import com.marketplace.backend.dto.catalog.CatalogConverters;
import com.marketplace.backend.dto.catalog.request.RequestSaveCatalogDto;
import com.marketplace.backend.dto.catalog.response.ResponseSimpleCatalogDto;
import com.marketplace.backend.dto.catalog.response.single.NumberAttributeDto;
import com.marketplace.backend.dto.catalog.response.single.ResponseSingleCatalogDto;
import com.marketplace.backend.dto.catalog.response.single.SelectAttributeDto;
import com.marketplace.backend.dto.catalog.response.single.SelectValueDto;
import com.marketplace.backend.exception.ResourceNotFoundException;
import com.marketplace.backend.model.Attribute;
import com.marketplace.backend.model.Catalog;
import com.marketplace.backend.model.EAttributeType;
import com.marketplace.backend.model.Paging;
import com.marketplace.backend.model.values.SelectableValue;
import com.marketplace.backend.repository.CatalogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.persistence.TypedQuery;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CatalogService implements CatalogDao {

    private final CatalogRepository catalogRepository;
    private final CatalogConverters catalogConverters;
    @PersistenceContext
    private final EntityManager entityManager;

    @Autowired
    public CatalogService(CatalogRepository catalogRepository, CatalogConverters catalogConverters, EntityManager entityManager) {
        this.catalogRepository = catalogRepository;
        this.catalogConverters = catalogConverters;
        this.entityManager = entityManager;
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
    public ResponseSingleCatalogDto findCatalogByAlias(String alias) {
        TypedQuery<Catalog> catalogQuery =
                entityManager.
                        createQuery("SELECT c from Catalog as c join fetch  c.attributes where c.alias=:alias",Catalog.class);
        catalogQuery.setParameter("alias",alias);
        Catalog catalog = catalogQuery.getSingleResult();
        TypedQuery<SelectableValue> selectableValueQuery = entityManager
                .createQuery("select distinct sv from Product as p left join p.selectableValues as sv where p.catalog.id=:catalogId", SelectableValue.class);
        selectableValueQuery.setParameter("catalogId",catalog.getId());
        List<SelectableValue> selectableValues = selectableValueQuery.getResultList();
        List<Attribute> attributeList = catalog.getAttributes()
                .stream().filter(x -> x.getType().equals(EAttributeType.SELECTABLE)).toList();
        List<SelectAttributeDto> selectAttributeDtos = new ArrayList<>();
        for(Attribute attribute: attributeList){
            SelectAttributeDto dto = new SelectAttributeDto();
            dto.setId(attribute.getId());
            dto.setName(attribute.getName());
            dto.setAlias(attribute.getAlias());
            List<SelectableValue> selValueForAttributes
                    = selectableValues.stream().filter(value -> {
                        if(value==null){
                            return false;
                        }
                        return value.getAttribute().equals(attribute);
                    }).toList();
            dto.setValues(selValueForAttributes
                    .stream().map(x->new SelectValueDto(x.getId(), x.getValue())).collect(Collectors.toSet()));
            selectAttributeDtos.add(dto);
        }
        TypedQuery<NumberAttributeDto> doubleValueQuery = entityManager
                .createQuery("SELECT distinct new com.marketplace.backend." +
                        "dto.catalog.response.single" +
                        ".NumberAttributeDto(at.id,at.name,at.alias,min (dv.value),max (dv.value)) " +
                        "from Product as p left join p.doubleValues as dv " +
                        "left join dv.attribute as at where p.catalog.id =: catalogId group by at", NumberAttributeDto.class);
        doubleValueQuery.setParameter("catalogId",catalog.getId());
        List<NumberAttributeDto> listDoubleDto = doubleValueQuery.getResultList();
        listDoubleDto.removeIf(x->(x.getId()==null));
        return new ResponseSingleCatalogDto(catalog,selectAttributeDtos,listDoubleDto);
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
