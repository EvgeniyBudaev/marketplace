package com.marketplace.backend.controller;

import com.marketplace.backend.dao.CatalogDao;
import com.marketplace.backend.dto.converters.CatalogConverters;
import com.marketplace.backend.dto.request.catalog.RequestSaveCatalogDto;
import com.marketplace.backend.dto.response.catalog.ResponseSingleCatalogDto;
import com.marketplace.backend.dto.response.catalog.ResponseListCatalogDto;
import com.marketplace.backend.model.Catalog;
import com.marketplace.backend.model.Paging;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
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

    @GetMapping("/page")
    public Paging<ResponseListCatalogDto> showAllCatalogs(@RequestParam(name = "page", defaultValue = "1") Integer page,
                                                          @RequestParam(name = "size", defaultValue = "5") Integer pageSize) {
        if (page < 1) {
            page = 1;
        }
        if (pageSize <1){
            pageSize = 5;
        }
        Paging<Catalog> resultQuery = catalogDao.getAll(page,pageSize);
        Paging<ResponseListCatalogDto> result = new Paging<>(resultQuery.getCountOfResult(),pageSize,Long.valueOf(page));
        result.setContent(resultQuery.getContent()
                .stream().map(catalogConverters::convertCatalogToSimpleDto).collect(Collectors.toList()));
        return result;
    }

    @GetMapping("/by_alias/{catalog}")
    public ResponseSingleCatalogDto getCatalogByAlias(@PathVariable String catalog) {
        return catalogConverters.convertCatalogToResponseCatalogDto(catalogDao.findCatalogByAlias(catalog));
    }

    @PostMapping
    public ResponseSingleCatalogDto saveOrUpdateCatalog(@Valid @RequestBody RequestSaveCatalogDto dto) {
        return catalogConverters.convertCatalogToResponseCatalogDto(catalogDao.save(dto));
    }


    @DeleteMapping("{alias}")
    public String deleteCatalog(@PathVariable String alias) {
        catalogDao.delete(alias);
        return "Catalog with alias = " + alias + " was deleted";
    }
}
