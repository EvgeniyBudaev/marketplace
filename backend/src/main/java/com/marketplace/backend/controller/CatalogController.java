package com.marketplace.backend.controller;

import com.marketplace.backend.dao.CatalogDao;
import com.marketplace.backend.dto.converters.CatalogConverters;
import com.marketplace.backend.dto.request.catalog.RequestSaveCatalogDto;
import com.marketplace.backend.dto.response.catalog.ResponseCatalogDto;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import javax.validation.Valid;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/catalogs")
public class CatalogController {

    private final CatalogDao catalogDao;
    private final CatalogConverters catalogConverters;
    private final EntityManager entityManager;

    public CatalogController(CatalogDao catalogDao, CatalogConverters catalogConverters, EntityManager entityManager) {
        this.catalogDao = catalogDao;
        this.catalogConverters = catalogConverters;
        this.entityManager = entityManager;
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
    public ResponseCatalogDto saveOrUpdateCatalog(@Valid @RequestBody RequestSaveCatalogDto dto) {
        return catalogConverters.convertCatalogToResponseCatalogDto(catalogDao.save(dto));
    }


    /*Пока сделано так что невозможно удалить каталог если у него есть продукты*/
    @DeleteMapping("{id}")
    public String deleteCatalog(@PathVariable Long id) {
        Query query = entityManager.createQuery("Select count (p.products) from Catalog as p where p.id=:id");
        query.setParameter("id",id);
        Integer count = (Integer) query.getSingleResult();
        if(count>0){
            throw  new RuntimeException("Каталог содержит продукты удаление невозможно");
        }
        catalogDao.delete(id);
        return "Catalog with ID = " + id + " was deleted";
    }
}
