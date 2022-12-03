package com.marketplace.backend.dto.converters;

import com.marketplace.backend.dto.request.catalog.RequestSaveCatalogDto;
import com.marketplace.backend.dto.response.catalog.ResponseSingleCatalogDto;
import com.marketplace.backend.dto.response.catalog.ResponseListCatalogDto;
import com.marketplace.backend.model.Attribute;
import com.marketplace.backend.model.Catalog;
import com.marketplace.backend.model.values.SelectableValue;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class CatalogConverters {
    public ResponseSingleCatalogDto convertCatalogToResponseCatalogDto(Catalog catalog){
        ResponseSingleCatalogDto dto = new ResponseSingleCatalogDto();
        dto.setId(catalog.getId());
        dto.setName(catalog.getName());
        dto.setEnabled(catalog.isEnabled());
        dto.setAlias(catalog.getAlias());
        dto.setImage(catalog.getImage());
        dto.setSelectAttribute(convertAttributeToDto(catalog.getAttributes()));
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
    private List<ResponseSingleCatalogDto.SelectAttributeDto> convertAttributeToDto(List<Attribute> list){
        List<ResponseSingleCatalogDto.SelectAttributeDto> result = new ArrayList<>();
        if(list==null){
            return result;
        }
        for (Attribute attribute: list){
            ResponseSingleCatalogDto.SelectAttributeDto dto = new ResponseSingleCatalogDto.SelectAttributeDto();
            dto.setId(attribute.getId());
            dto.setName(attribute.getName());
            dto.setAlias(attribute.getAlias());
            dto.setValues(Set.copyOf(attribute.getSingleSelectableValue()
                    .stream().map(SelectableValue::getValue).collect(Collectors.toList())));
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
