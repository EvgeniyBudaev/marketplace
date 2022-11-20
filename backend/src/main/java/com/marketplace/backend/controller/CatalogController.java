package com.marketplace.backend.controller;

import com.marketplace.backend.dao.CatalogDao;
import com.marketplace.backend.dto.converters.CatalogConverters;
import com.marketplace.backend.dto.request.catalog.RequestSaveCatalogDto;
import com.marketplace.backend.dto.response.catalog.ResponseCatalogDto;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/catalogs")
public class CatalogController {

    private final CatalogDao catalogDao;
    private final CatalogConverters catalogConverters;

    public CatalogController(CatalogDao catalogDao, CatalogConverters catalogConverters) {
        this.catalogDao = catalogDao;
        this.catalogConverters = catalogConverters;
    }

    @GetMapping
    public List<ResponseCatalogDto> showAllCatalogs() {
        return catalogDao.getAll().stream().map(catalogConverters::convertCatalogToResponseCatalogDto).collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public ResponseCatalogDto getCatalogById(@PathVariable Long id) {
        return catalogConverters.convertCatalogToResponseCatalogDto(catalogDao.findById(id));
    }

    @GetMapping("/{catalog}")
    public ResponseCatalogDto getCatalogByAlias(@PathVariable String catalog) {
        return catalogConverters.convertCatalogToResponseCatalogDto(catalogDao.findCatalogByAlias(catalog));
    }

    @PostMapping
    public ResponseCatalogDto saveOrUpdateCatalog(@RequestBody RequestSaveCatalogDto dto) {
        return catalogConverters.convertCatalogToResponseCatalogDto(catalogDao.save(dto));
    }


    @DeleteMapping("{id}")
    public String deleteCatalog(@PathVariable Long id) {
        catalogDao.delete(id);
        return "Catalog with ID = " + id + " was deleted";
    }
}
