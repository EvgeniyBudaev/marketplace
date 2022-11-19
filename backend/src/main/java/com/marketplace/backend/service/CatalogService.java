package com.marketplace.backend.service;

import com.marketplace.backend.dao.CatalogDao;
import com.marketplace.backend.model.Catalog;
import com.marketplace.backend.repository.CatalogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CatalogService implements CatalogDao {
    @Autowired
    private CatalogRepository catalogRepository;

    @Override
    public List<Catalog> getAll() {
        return catalogRepository.findAll();
    }

    @Override
    public void save(Catalog catalog) {
        catalogRepository.save(catalog);
    }

    @Override
    public Catalog findById(Long id) {
        Catalog catalog = null;
        Optional<Catalog> optional = catalogRepository.findById(id);
        if (optional.isPresent()) {
            catalog = optional.get();
        }
        return catalog;
    }

    @Override
    public void delete(Long id) {
        catalogRepository.deleteById(id);
    }
}
