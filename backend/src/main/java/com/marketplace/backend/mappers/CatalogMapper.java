package com.marketplace.backend.mappers;

import com.marketplace.backend.dto.catalog.request.RequestSaveCatalogDto;
import com.marketplace.backend.dto.catalog.response.ResponseSimpleCatalogDto;
import com.marketplace.backend.dto.catalog.response.ResponseSingleAfterSaveCatalogDto;
import com.marketplace.backend.dto.catalog.response.single.ResponseSingleCatalogDto;
import com.marketplace.backend.model.Attribute;
import com.marketplace.backend.model.Catalog;
import com.marketplace.backend.model.values.SelectableValue;
import org.mapstruct.Mapper;

import java.util.ArrayList;
import java.util.HashSet;
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
    default ResponseSingleAfterSaveCatalogDto entityToAfterSaveDto(Catalog catalog,List<Attribute> selAttributeList,List<Attribute> numAttributeList){
        ResponseSingleAfterSaveCatalogDto dto = new ResponseSingleAfterSaveCatalogDto();
        dto.setId(catalog.getId());
        dto.setAlias(catalog.getAlias());
        dto.setName(catalog.getName());
        dto.setImage(catalog.getImage());
        dto.setEnabled(catalog.isEnabled());
        dto.setCreatedAt(catalog.getCreatedAt());
        dto.setModifyDate(catalog.getModifyDate());
        Set<ResponseSingleAfterSaveCatalogDto.SelectAttributeDto> selectAttributeDtos = new HashSet<>();
        selAttributeList.forEach(x->{
            ResponseSingleAfterSaveCatalogDto.SelectAttributeDto selDto = new ResponseSingleAfterSaveCatalogDto.SelectAttributeDto();
            selDto.setAlias(x.getAlias());
            selDto.setId(x.getId());
            selDto.setName(x.getName());
            Set<ResponseSingleAfterSaveCatalogDto.SelectValueDto> selectValueDtoSet = new HashSet<>(x.getSingleSelectableValue().size());
            x.getSingleSelectableValue().forEach(y-> {
                ResponseSingleAfterSaveCatalogDto.SelectValueDto  selectValueDto = new ResponseSingleAfterSaveCatalogDto.SelectValueDto(y.getId(), y.getValue());
                selectValueDtoSet.add(selectValueDto);
            });
           selDto.setValues(selectValueDtoSet);
           selectAttributeDtos.add(selDto);
        });
        dto.setSelectAttribute(selectAttributeDtos);
        dto.setNumberAttribute();
        return dto;
    }
}
