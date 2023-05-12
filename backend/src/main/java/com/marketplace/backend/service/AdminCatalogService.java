package com.marketplace.backend.service;

import com.marketplace.backend.exception.ResourceNotFoundException;
import com.marketplace.backend.model.Catalog;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityGraph;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;

@Service
public class AdminCatalogService {

    @PersistenceContext
    private final EntityManager entityManager;

    @Autowired
    public AdminCatalogService(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    public Catalog findCatalogByAliasWithFullAttributes(String alias) {
        TypedQuery<Catalog> catalogQuery =
                entityManager.
                        createQuery("SELECT c from Catalog as c where c.alias=:alias", Catalog.class);
        catalogQuery.setParameter("alias", alias);
        EntityGraph<?> entityGraph = entityManager.getEntityGraph("catalog-with-full-attributes");
        catalogQuery.setHint("javax.persistence.fetchgraph", entityGraph);
        return catalogQuery.getResultStream()
                .findFirst().orElseThrow(() -> new ResourceNotFoundException("Не найден каталог с псевдонимом " + alias));
    }
}
