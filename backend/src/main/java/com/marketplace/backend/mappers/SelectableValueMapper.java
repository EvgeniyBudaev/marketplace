package com.marketplace.backend.mappers;

import com.marketplace.backend.dto.attributes.request.RequestPutAttributeDto;
import com.marketplace.backend.dto.attributes.response.SelectableValueDto;
import com.marketplace.backend.dto.values.request.RequestSaveSelValueDto;
import com.marketplace.backend.dto.values.response.ResponseSaveUpdateSelValueDto;
import com.marketplace.backend.model.values.SelectableValue;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;
import java.util.Set;

@Mapper(componentModel = "spring")
public interface SelectableValueMapper {

    SelectableValue dtoToEntity(SelectableValueDto dto);
    @Mapping(target = "attributeId",source = "attribute.id")
    SelectableValueDto entityToDto(SelectableValue selectableValue);
    Set<SelectableValueDto> entitySetToDtoSet(Set<SelectableValue> values);
    List<SelectableValue> dtoListToEntitySet(Set<SelectableValueDto> dtoList);
    SelectableValue saveDtoToEntity(RequestSaveSelValueDto dto);

    Set<ResponseSaveUpdateSelValueDto> entityValuesSetToDtoSet(Set<SelectableValue> values);
    @Mapping(target = "attributeAlias", source = "attribute.alias")
    ResponseSaveUpdateSelValueDto selectableValueToResponseSaveUpdateSelValueDto(SelectableValue selectableValue);

    List<SelectableValue> dtoListToEntitySet(List<RequestPutAttributeDto.SelectableValueDto> dtoList);

}
