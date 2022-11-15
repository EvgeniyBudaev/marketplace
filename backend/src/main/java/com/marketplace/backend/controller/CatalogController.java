package com.marketplace.backend.controller;

import com.marketplace.backend.entity.Catalog;
import com.marketplace.backend.service.CatalogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
public class CatalogController {
    @Autowired
    private CatalogService catalogService;

    @GetMapping("/catalogs")
    public List<Catalog> showAllCatalogs() {
        return catalogService.getAllCatalogs();
    }

    @GetMapping("/catalogs/{id}")
    public Catalog getCatalog(@PathVariable long id) {
        return catalogService.getCatalog(id);
    }

    @PostMapping("/catalogs")
    public Catalog addNewCatalog(@RequestBody Catalog catalog) {
        catalogService.saveCatalog(catalog);
        return catalog;
    }

    @PutMapping("/catalogs")
    public Catalog updateCatalog(@RequestBody Catalog catalog) {
        catalogService.saveCatalog(catalog);
        return catalog;
    }

    @DeleteMapping("/catalogs/{id}")
    public String deleteCatalog(@PathVariable long id) {
        catalogService.deleteCatalog(id);
        return "Catalog with ID = " + id + " was deleted";
    }
}
