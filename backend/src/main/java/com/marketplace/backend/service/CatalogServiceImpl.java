package com.marketplace.backend.service;

import com.marketplace.backend.model.Catalog;
import com.marketplace.backend.repository.CatalogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CatalogServiceImpl implements CatalogService {
    @Autowired
    private CatalogRepository catalogRepository;

    @Override
    public List<Catalog> getAllCatalogs() {
        return catalogRepository.findAll();
    }

    @Override
    public void saveCatalog(Catalog catalog) {
        catalogRepository.save(catalog);
    }

    @Override
    public Catalog getCatalog(long id) {
        Catalog catalog = null;
        Optional<Catalog> optional = catalogRepository.findById(id);
        if (optional.isPresent()) {
            catalog = optional.get();
        }
        return catalog;
    }

    @Override
    public void deleteCatalog(long id) {
        catalogRepository.deleteById(id);
    }
}
