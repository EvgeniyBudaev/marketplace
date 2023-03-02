package com.marketplace.backend.controller;

import com.marketplace.backend.dto.catalog.response.ResponseAttributeByCatalogAlias;
import com.marketplace.backend.mappers.CatalogMapper;
import com.marketplace.backend.model.Attribute;
import com.marketplace.backend.model.Catalog;
import com.marketplace.backend.model.EAttributeType;
import com.marketplace.backend.service.AdminCatalogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Set;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/admin/catalogs/")
public class AdminCatalogController {
    private final AdminCatalogService adminCatalogService;
    private final CatalogMapper catalogMapper;

    @Autowired
    public AdminCatalogController(AdminCatalogService adminCatalogService, CatalogMapper catalogMapper) {
        this.adminCatalogService = adminCatalogService;
        this.catalogMapper = catalogMapper;
    }

    @GetMapping("/attributes/{alias}")
    public ResponseAttributeByCatalogAlias getAttributesByCatalogAlias(@PathVariable final String alias){
        Catalog catalog = adminCatalogService.findCatalogByAliasWithFullAttributes(alias);

        ResponseAttributeByCatalogAlias dto = catalogMapper.entityToAttributesDto(catalog);
        if(catalog.getAttributes()==null){
            return dto;
        }
        Set<Attribute> selAttributeSet = catalog.getAttributes()
                .stream().filter(x -> x.getType().equals(EAttributeType.SELECTABLE)).collect(Collectors.toUnmodifiableSet());
        Set<Attribute> numAttributeSet = catalog.getAttributes()
                .stream().filter(x -> x.getType().equals(EAttributeType.DOUBLE)).collect(Collectors.toUnmodifiableSet());
        if(!numAttributeSet.isEmpty()){
            dto.setNumberAttribute(catalogMapper.numericAttributeToDto(numAttributeSet));
        }
        if(selAttributeSet.isEmpty()){
            return dto;
        }
        dto.setSelectableAttribute(catalogMapper.selectableAttributeToDto(selAttributeSet));

        return dto;
    }
}
