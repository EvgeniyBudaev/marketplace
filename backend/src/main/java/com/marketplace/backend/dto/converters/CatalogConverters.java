package com.marketplace.backend.dto.converters;

import com.marketplace.backend.dto.request.catalog.RequestSaveCatalogDto;
import com.marketplace.backend.dto.response.catalog.ResponseCatalogDto;
import com.marketplace.backend.dto.response.catalog.ResponseListCatalogDto;
import com.marketplace.backend.model.Attribute;
import com.marketplace.backend.model.Catalog;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class CatalogConverters {
    public ResponseCatalogDto convertCatalogToResponseCatalogDto(Catalog catalog){
        ResponseCatalogDto dto = new ResponseCatalogDto();
        dto.setId(catalog.getId());
        dto.setName(catalog.getName());
        dto.setEnabled(catalog.isEnabled());
        dto.setAlias(catalog.getAlias());
        dto.setImage(catalog.getImage());
        dto.setAttribute(convertAttributeToDto(catalog.getAttributes()));
        return dto;
    }
    public ResponseListCatalogDto convertCatalogToSimpleDto(Catalog catalog){
        ResponseListCatalogDto dto = new ResponseListCatalogDto();
        dto.setAlias(catalog.getAlias());
        dto.setId(catalog.getId());
        dto.setImage(catalog.getImage());
        dto.setName(catalog.getName());
        return dto;
    }
    private List<ResponseCatalogDto.AttributeDto> convertAttributeToDto(List<Attribute> list){
        List<ResponseCatalogDto.AttributeDto> result = new ArrayList<>();
        if(list==null){
            return result;
        }
        for (Attribute attribute: list){
            ResponseCatalogDto.AttributeDto dto = new ResponseCatalogDto.AttributeDto();
            dto.setId(attribute.getId());
            dto.setType(attribute.getType().name());
            dto.setName(attribute.getName());
            result.add(dto);
        }
        return result;
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
