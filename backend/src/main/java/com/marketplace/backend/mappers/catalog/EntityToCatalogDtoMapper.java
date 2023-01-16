package com.marketplace.backend.mappers.catalog;

import com.marketplace.backend.dto.catalog.response.single.ResponseSingleCatalogDto;
import com.marketplace.backend.model.Attribute;
import com.marketplace.backend.model.Catalog;
import com.marketplace.backend.model.values.SelectableValue;
import org.mapstruct.Mapper;


import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Mapper
public interface EntityToCatalogDtoMapper {
    ResponseSingleCatalogDto entityToSingleCatalogDto(Catalog catalog);

    default ResponseSingleCatalogDto.SelectAttributeDto entitySelectableValuesToDto(List<SelectableValue> entityList, Attribute attribute){
        ResponseSingleCatalogDto.SelectAttributeDto dto = new ResponseSingleCatalogDto.SelectAttributeDto();
        dto.setId(attribute.getId());
        dto.setName(attribute.getName());
        dto.setAlias(attribute.getAlias());
        Set<ResponseSingleCatalogDto.SelectValueDto> valueDtoList = entityList.stream().map(this::singleEntitySelectableValueToDto).collect(Collectors.toSet());
        dto.setValues(valueDtoList);
        return dto;
    }
    ResponseSingleCatalogDto.SelectValueDto singleEntitySelectableValueToDto(SelectableValue entity);

}
