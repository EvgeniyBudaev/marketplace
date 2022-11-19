package com.marketplace.backend.controller;

import com.marketplace.backend.dao.CatalogDao;
import com.marketplace.backend.model.Catalog;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
public class CatalogController {
    @Autowired
    private CatalogDao catalogDao;

    @GetMapping("/catalogs")
    public List<Catalog> showAllCatalogs() {
        return catalogDao.getAll();
    }

    @GetMapping("/catalogs/{id}")
    public Catalog getCatalog(@PathVariable long id) {
        return catalogDao.findById(id);
    }

    @PostMapping("/catalogs")
    public Catalog addNewCatalog(@RequestBody Catalog catalog) {
        catalogDao.save(catalog);
        return catalog;
    }

    @PutMapping("/catalogs")
    public Catalog updateCatalog(@RequestBody Catalog catalog) {
        catalogDao.save(catalog);
        return catalog;
    }

    @DeleteMapping("/catalogs/{id}")
    public String deleteCatalog(@PathVariable long id) {
        catalogDao.delete(id);
        return "Catalog with ID = " + id + " was deleted";
    }
}
