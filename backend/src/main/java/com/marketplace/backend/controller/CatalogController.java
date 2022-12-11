package com.marketplace.backend.controller;

import com.marketplace.backend.dao.CatalogDao;
import com.marketplace.backend.dto.catalog.request.RequestSaveCatalogDto;
import com.marketplace.backend.dto.catalog.response.ResponseSimpleCatalogDto;
import com.marketplace.backend.dto.catalog.response.single.ResponseSingleCatalogDto;
import com.marketplace.backend.model.Paging;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/v1/catalogs")
public class CatalogController {

    private final CatalogDao catalogDao;

    public CatalogController(CatalogDao catalogDao) {
        this.catalogDao = catalogDao;
    }

    @GetMapping("/page")
    public Paging<ResponseSimpleCatalogDto> showAllCatalogs(@RequestParam(name = "page", defaultValue = "1") Integer page,
                                                            @RequestParam(name = "size", defaultValue = "5") Integer pageSize) {
        if (page < 1) {
            page = 1;
        }
        if (pageSize <1){
            pageSize = 5;
        }
        return catalogDao.getAll(page, pageSize);
    }

    @GetMapping("/by_alias/{catalog}")
    public ResponseSingleCatalogDto getCatalogByAlias(@PathVariable String catalog) {
        return catalogDao.findCatalogByAlias(catalog);
    }

    @PostMapping
    public ResponseSingleCatalogDto saveOrUpdateCatalog(@Valid @RequestBody RequestSaveCatalogDto dto) {
        return catalogDao.save(dto);
    }


    @DeleteMapping("{alias}")
    public String deleteCatalog(@PathVariable String alias) {
        catalogDao.delete(alias);
        return "Catalog with alias = " + alias + " was deleted";
    }
}
