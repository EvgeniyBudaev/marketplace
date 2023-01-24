package com.marketplace.backend.controller;


import com.marketplace.backend.dto.catalog.request.RequestSaveCatalogDto;
import com.marketplace.backend.dto.catalog.response.ResponseSimpleCatalogDto;
import com.marketplace.backend.dto.catalog.response.single.ResponseSingleCatalogDto;
import com.marketplace.backend.mappers.CatalogMapper;
import com.marketplace.backend.model.Attribute;
import com.marketplace.backend.model.Catalog;
import com.marketplace.backend.model.EAttributeType;
import com.marketplace.backend.model.Paging;
import com.marketplace.backend.model.values.SelectableValue;
import com.marketplace.backend.service.CatalogService;
import org.mapstruct.factory.Mappers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/api/v1/catalogs")
public class CatalogController {

    private final CatalogService catalogService;
    private final CatalogMapper mapper;
    @Autowired
    public CatalogController(CatalogService catalogService) {
        this.catalogService = catalogService;
        mapper = Mappers.getMapper(CatalogMapper.class);
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
        return catalogService.getAll(page, pageSize);
    }

    @GetMapping("/by_alias/{alias}")
    public ResponseSingleCatalogDto getCatalogByAlias(@PathVariable String alias) {
        Catalog catalog = catalogService.findCatalogByAliasWithFullAttributes(alias);
        ResponseSingleCatalogDto dto = mapper.entityToSingleCatalogDto(catalog);
        if(catalog.getAttributes()==null){
            return dto;
        }
        List<Attribute> selAttributeList = catalog.getAttributes()
                .stream().filter(x -> x.getType().equals(EAttributeType.SELECTABLE)).toList();
        List<Attribute> numAttributeList = catalog.getAttributes()
                .stream().filter(x -> x.getType().equals(EAttributeType.DOUBLE)).toList();
        if(!numAttributeList.isEmpty()){
            dto.setNumberAttribute(catalogService.findNumberAttributesInCatalog(catalog));
        }
        if(selAttributeList.isEmpty()){
            return dto;
        }
        Set<ResponseSingleCatalogDto.SelectAttributeDto> selectAttributeDtos = new HashSet<>();
        Set<SelectableValue> selectableValues = catalogService.findSelectableAttributesInCatalog(catalog);
        for(Attribute attribute: selAttributeList){
            List<SelectableValue> selValueForAttributes
                    = selectableValues.stream().filter(value -> {
                if(value==null){
                    return false;
                }
                return value.getAttribute().equals(attribute);
            }).toList();
            selectAttributeDtos.add(mapper.entitySelectableValuesToDto(selValueForAttributes,attribute));
        }
        dto.setSelectAttribute(selectAttributeDtos);
        return dto;
    }

    @PostMapping
    public ResponseSingleCatalogDto saveOrUpdateCatalog(@Valid @RequestBody RequestSaveCatalogDto dto) {
        Catalog catalog = catalogService.save(dto);
        return getCatalogByAlias(catalog.getAlias());
    }


    @DeleteMapping("{alias}")
    public void deleteCatalog(@PathVariable String alias) {
        catalogService.delete(alias);
    }
}
