package com.marketplace.backend.service;


import com.marketplace.backend.dto.catalog.request.RequestSaveCatalogDto;
import com.marketplace.backend.dto.catalog.response.ResponseSimpleCatalogDto;
import com.marketplace.backend.dto.catalog.response.single.NumberAttributeDto;
import com.marketplace.backend.exception.OperationNotAllowedException;
import com.marketplace.backend.exception.ResourceNotFoundException;
import com.marketplace.backend.mappers.CatalogMapper;
import com.marketplace.backend.model.Catalog;
import com.marketplace.backend.model.Paging;
import com.marketplace.backend.model.values.SelectableValue;
import com.marketplace.backend.repository.CatalogRepository;
import org.mapstruct.factory.Mappers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.*;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class CatalogService {
    private final CatalogMapper mapper;
    private final AttributeValueService attributeValueService;
    private final CatalogRepository catalogRepository;

    @PersistenceContext
    private final EntityManager entityManager;

    @Autowired
    public CatalogService(AttributeValueService attributeValueService, CatalogRepository catalogRepository,  EntityManager entityManager) {
        this.attributeValueService = attributeValueService;
        this.catalogRepository = catalogRepository;
        this.entityManager = entityManager;
        this.mapper = Mappers.getMapper(CatalogMapper.class);
    }

    @Transactional
    public void save(Catalog catalog) {
        catalogRepository.save(catalog);
    }


    public Catalog save(RequestSaveCatalogDto dto) {
        Catalog catalog = mapper.dtoToEntity(dto);
        save(catalog);
        return catalog;
    }

    public Catalog findCatalogByAliasWithFullAttributes(String alias){
        TypedQuery<Catalog> catalogQuery =
                entityManager.
                        createQuery("SELECT c from Catalog as c where c.alias=:alias",Catalog.class);
        catalogQuery.setParameter("alias",alias);
        EntityGraph<?> entityGraph = entityManager.getEntityGraph("catalog-with-full-attributes");
        catalogQuery.setHint("javax.persistence.fetchgraph", entityGraph);
        return catalogQuery.getResultStream()
                .findFirst().orElseThrow(()->new ResourceNotFoundException("Не найден каталог с псевдонимом "+alias));
    }

    public Set<NumberAttributeDto> findNumberAttributesInCatalog (Catalog catalog){
        return attributeValueService.findNumberAttributesInCatalog(catalog.getId());
    }

    public Set<SelectableValue> findSelectableAttributesInCatalog(Catalog catalog){
        return attributeValueService.findSelectableAttributesInCatalog(catalog.getId());
    }

    @Transactional
    public Paging<ResponseSimpleCatalogDto> getAll(Integer page, Integer pageSize) {
       TypedQuery<Long> countQuery = entityManager.createQuery("select count (c) from Catalog as c where c.enabled=true", Long.class);
       Integer count = Math.toIntExact(countQuery.getSingleResult());
       TypedQuery<Catalog> resultQuery = entityManager.createQuery("select c from Catalog  as c where c.enabled=true", Catalog.class);
       Paging<ResponseSimpleCatalogDto> result = new Paging<>(count,pageSize,page);
       result.setContent(resultQuery.getResultStream()
               .map(mapper::entityToSimpleCatalogDto).collect(Collectors.toList()));
       return result;
    }

    @Transactional
    public void delete(String alias) {
        TypedQuery<Long> query = entityManager.createQuery("Select count (p.products) from Catalog as p where p.alias=:alias", Long.class);
        query.setParameter("alias",alias);
        int count = Math.toIntExact(query.getSingleResult());
        if(count>0){
            throw  new OperationNotAllowedException("Каталог содержит продукты удаление невозможно");
        }
        Query queryDelete = entityManager.createQuery("UPDATE Catalog as c set c.enabled = false where c.alias=:alias");
        queryDelete.setParameter("alias",alias);
        queryDelete.executeUpdate();
    }


    public Catalog findEntityByAlias(String catalogAlias) {
        return catalogRepository.findCatalogByAlias(catalogAlias).orElseThrow(()->new ResourceNotFoundException("Не найден каталог с псевдонимом: "+catalogAlias));
    }
}
