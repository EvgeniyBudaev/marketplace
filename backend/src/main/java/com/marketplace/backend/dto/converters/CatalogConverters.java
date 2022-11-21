package com.marketplace.backend.dto.converters;

import com.marketplace.backend.dto.request.catalog.RequestSaveCatalogDto;
import com.marketplace.backend.dto.response.catalog.ResponseCatalogDto;
import com.marketplace.backend.model.Catalog;
import org.springframework.stereotype.Service;

@Service
public class CatalogConverters {
    public ResponseCatalogDto convertCatalogToResponseCatalogDto(Catalog catalog){
        ResponseCatalogDto dto = new ResponseCatalogDto();
        dto.setId(catalog.getId());
        dto.setName(catalog.getName());
        dto.setEnabled(catalog.isEnabled());
        dto.setAlias(catalog.getAlias());
        dto.setImage(catalog.getImage());
        return dto;
    }

    public Catalog convertRequestSaveCatalogDtoToCatalog(RequestSaveCatalogDto dto){
        Catalog catalog = new Catalog();
        catalog.setId(dto.getId());
        catalog.setAlias(dto.getAlias());
        catalog.setName(dto.getName());
        catalog.setImage(dto.getImage());
        catalog.setEnabled(dto.isEnabled());
        return catalog;
    }
}
