package com.marketplace.backend.controller;


import com.marketplace.backend.dto.catalog.request.RequestPutCatalogDto;
import com.marketplace.backend.dto.catalog.request.RequestSaveCatalogDto;
import com.marketplace.backend.dto.catalog.request.RequestUpdateCatalogDto;
import com.marketplace.backend.dto.catalog.response.ResponseSimpleCatalogDto;
import com.marketplace.backend.dto.catalog.response.ResponseSingleAfterSaveCatalogDto;
import com.marketplace.backend.dto.catalog.response.single.NumberAttributeDto;
import com.marketplace.backend.dto.catalog.response.single.ResponseSingleCatalogDto;
import com.marketplace.backend.exception.AppError;
import com.marketplace.backend.mappers.CatalogMapper;
import com.marketplace.backend.model.Attribute;
import com.marketplace.backend.model.Catalog;
import com.marketplace.backend.model.EAttributeType;
import com.marketplace.backend.model.Paging;
import com.marketplace.backend.model.values.SelectableValue;
import com.marketplace.backend.service.CatalogService;
import com.marketplace.backend.service.utils.queryes.QueryParam;
import com.marketplace.backend.service.utils.queryes.UrlResolver;
import com.marketplace.backend.service.utils.queryes.UrlResolverImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/api/v1/catalogs")
public class CatalogController {

    private final CatalogService catalogService;
    private final CatalogMapper mapper;

    @Autowired
    public CatalogController(CatalogService catalogService, CatalogMapper mapper) {
        this.catalogService = catalogService;
        this.mapper = mapper;
    }

    @GetMapping("/get_all")
    public Paging<ResponseSimpleCatalogDto> findAll(HttpServletRequest request) {
        String rawQueryString = request.getQueryString();
        String queryString = null;
        if (rawQueryString != null) {
            queryString = URLDecoder.decode(rawQueryString, StandardCharsets.UTF_8);
        }
        UrlResolver resolver = new UrlResolverImpl();
        QueryParam param = resolver.resolveQueryString(queryString);

        return catalogService.findAll(param);
    }

    @GetMapping("/by_alias/{alias}")
    public ResponseSingleCatalogDto getCatalogByAlias(@PathVariable String alias) {
        Catalog catalog = catalogService.catalogByAlias(alias);
        ResponseSingleCatalogDto dto = mapper.entityToSingleCatalogDto(catalog);
        if (catalog.getAttributes() == null) {
            return dto;
        }
        List<Attribute> selAttributeList = catalog.getAttributes()
                .stream().filter(x -> x.getType().equals(EAttributeType.SELECTABLE)).toList();
        List<Attribute> numAttributeList = catalog.getAttributes()
                .stream().filter(x -> x.getType().equals(EAttributeType.DOUBLE)).toList();
        if (!numAttributeList.isEmpty()) {
            Set<NumberAttributeDto> num = catalogService.findUseNumericAttributesInCatalog(catalog);
            if (num == null || num.isEmpty()) {
                dto.setNumberAttribute(null);
            } else {
                dto.setNumberAttribute(num);
            }
        } else {
            dto.setNumberAttribute(null);
        }
        if (selAttributeList.isEmpty()) {
            dto.setSelectAttribute(null);
            return dto;
        }
        Set<ResponseSingleCatalogDto.SelectAttributeDto> selectAttributeDtos = new HashSet<>();
        Set<SelectableValue> selectableValues = catalogService.findUseSelectableAttributesInCatalog(catalog);
        for (Attribute attribute : selAttributeList) {
            List<SelectableValue> selValueForAttributes
                    = selectableValues.stream().filter(value -> {
                if (value == null) {
                    return false;
                }
                return value.getAttribute().equals(attribute);
            }).toList();
            selectAttributeDtos.add(mapper.entitySelectableValuesToDto(selValueForAttributes, attribute));
        }
        dto.setSelectAttribute(selectAttributeDtos);
        return dto;
    }

    @PostMapping("/save")
    public ResponseSingleAfterSaveCatalogDto saveCatalog(@Valid RequestSaveCatalogDto dto, @RequestParam(name = "image",required = false) MultipartFile image) {
        Catalog catalog = catalogService.saveNewCatalog(dto,image);
        return getResponseSingleAfterSaveCatalogDto(catalog);
    }


    @DeleteMapping("/delete/{alias}")
    public ResponseEntity<?> deleteCatalog(@PathVariable String alias) {
        int countOfDeleteCatalogs = catalogService.delete(alias);
        if (countOfDeleteCatalogs < 1) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new AppError(HttpStatus.BAD_REQUEST.name(), "Не найден каталог с псевдониммом: " + alias));
        }
        return ResponseEntity.ok("Каталог с псевдонимом = " + alias + " удален");
    }

    @PatchMapping("/patch")
    public ResponseSingleAfterSaveCatalogDto updateCatalog(@Valid RequestUpdateCatalogDto dto,@RequestParam(name = "image",required = false) MultipartFile image) {
        Catalog catalog = catalogService.updateCatalog(dto);
        return getResponseSingleAfterSaveCatalogDto(catalog);
    }

    @PutMapping("/put")
    public ResponseSingleAfterSaveCatalogDto addCatalog(@Valid RequestPutCatalogDto dto, @RequestParam(name = "image",required = false) MultipartFile image) {
        Catalog catalog = catalogService.putCatalog(dto,image);
        return getResponseSingleAfterSaveCatalogDto(catalog);
    }

    public ResponseSingleAfterSaveCatalogDto getResponseSingleAfterSaveCatalogDto(Catalog catalog) {
        if (catalog.getAttributes() == null) {
            return mapper.entityToAfterSaveDto(catalog, Collections.emptyList(), Collections.emptyList());
        }
        List<Attribute> selAttributeList = catalog.getAttributes()
                .stream().filter(x -> x.getType().equals(EAttributeType.SELECTABLE)).toList();
        List<Attribute> numAttributeList = catalog.getAttributes()
                .stream().filter(x -> x.getType().equals(EAttributeType.DOUBLE)).toList();
        return mapper.entityToAfterSaveDto(catalog, selAttributeList, numAttributeList);
    }
}
