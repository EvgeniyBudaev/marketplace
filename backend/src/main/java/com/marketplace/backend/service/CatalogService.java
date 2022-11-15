package com.marketplace.backend.service;

import com.marketplace.backend.entity.Catalog;

import java.util.List;

public interface CatalogService {
    List<Catalog> getAllCatalogs();

    void saveCatalog(Catalog catalog);

    Catalog getCatalog(long id);

    void deleteCatalog(long id);
}
