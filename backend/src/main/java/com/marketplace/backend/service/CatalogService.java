package com.marketplace.backend.service;

import com.marketplace.backend.dao.CatalogDao;
import com.marketplace.backend.dto.catalog.CatalogConverters;
import com.marketplace.backend.dto.catalog.request.RequestSaveCatalogDto;
import com.marketplace.backend.model.Catalog;
import com.marketplace.backend.model.Paging;
import com.marketplace.backend.repository.CatalogRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.Query;

@Service
public class CatalogService implements CatalogDao {

    private final CatalogRepository catalogRepository;
    private final CatalogConverters catalogConverters;
    private final EntityManager entityManager;

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
    public Catalog save(RequestSaveCatalogDto dto) {
        Catalog catalog = catalogConverters.convertRequestSaveCatalogDtoToCatalog(dto);
        catalogRepository.save(catalog);
        return catalog;
    }

    @Override
    public Catalog findCatalogByAlias(String alias) {
        return catalogRepository.findCatalogByAlias(alias).orElseThrow();
    }


    @Override
    @Transactional
    public Paging<Catalog> getAll(Integer page, Integer pageSize) {
       Query countQuery = entityManager.createQuery("select count (c) from Catalog as c where c.enabled=true");
       Long count = (Long) countQuery.getSingleResult();

       Query resultQuery = entityManager.createQuery("select c from Catalog  as c where c.enabled=true");
       Paging<Catalog> result = new Paging<>(count,pageSize,Long.valueOf(page));
       result.setContent(resultQuery.getResultList());
       return result;
    }


    @Override
    @Transactional
    public void delete(String alias) {
        Query query = entityManager.createQuery("Select count (p.products) from Catalog as p where p.alias=:alias");
        query.setParameter("alias",alias);
        Integer count = (Integer) query.getSingleResult();
        if(count>0){
            throw  new RuntimeException("Каталог содержит продукты удаление невозможно");
        }
        Query queryDelete = entityManager.createQuery("UPDATE Catalog as c set c.enabled = false where c.alias=:alias");
        queryDelete.setParameter("alias",alias);
        queryDelete.executeUpdate();
    }


}
