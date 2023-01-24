package com.marketplace.backend.mappers;

import com.marketplace.backend.dto.catalog.request.RequestSaveCatalogDto;
import com.marketplace.backend.dto.catalog.response.ResponseSimpleCatalogDto;
import com.marketplace.backend.dto.catalog.response.single.ResponseSingleCatalogDto;
import com.marketplace.backend.model.Attribute;
import com.marketplace.backend.model.Catalog;
import com.marketplace.backend.model.values.SelectableValue;
import org.mapstruct.Mapper;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Mapper
public interface CatalogMapper {

    ResponseSingleCatalogDto entityToSingleCatalogDto(Catalog catalog);

    Catalog dtoToEntity(RequestSaveCatalogDto dto);

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
    ResponseSimpleCatalogDto entityToSimpleCatalogDto(Catalog catalog);
}
