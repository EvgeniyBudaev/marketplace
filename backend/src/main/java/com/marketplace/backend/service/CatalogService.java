package com.marketplace.backend.service;

import com.marketplace.backend.dao.CatalogDao;
import com.marketplace.backend.dto.converters.CatalogConverters;
import com.marketplace.backend.dto.request.catalog.RequestSaveCatalogDto;
import com.marketplace.backend.model.Catalog;
import com.marketplace.backend.repository.CatalogRepository;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import java.util.List;

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
    public List<Catalog> getAll() {
        return catalogRepository.findAllByEnabled(true);
    }


    @Override
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
