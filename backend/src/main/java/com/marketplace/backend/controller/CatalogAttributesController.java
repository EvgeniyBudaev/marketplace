package com.marketplace.backend.controller;

import com.marketplace.backend.dto.catalog.request.RequestManageAttributeInCatalogDto;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/v1/catalogs/attributes")
public class CatalogAttributesController {

    @PatchMapping
    public void addAttributeInCatalog(@RequestBody @Valid RequestManageAttributeInCatalogDto dto){

    }
    @DeleteMapping
    public void deleteAttributeFromCatalog(@RequestBody @Valid RequestManageAttributeInCatalogDto dto){

    }
}
