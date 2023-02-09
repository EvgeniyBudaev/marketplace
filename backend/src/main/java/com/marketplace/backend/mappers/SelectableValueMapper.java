package com.marketplace.backend.mappers;

import com.marketplace.backend.dto.attributes.response.SelectableValueDto;
import com.marketplace.backend.dto.values.request.RequestSaveSelValueDto;
import com.marketplace.backend.dto.values.request.RequestUpdateSelValueDto;
import com.marketplace.backend.model.values.SelectableValue;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;
import java.util.Set;

@Mapper
public interface SelectableValueMapper {

    Set<SelectableValue> dtoSetToEntitySet(Set<SelectableValueDto> dtoList);
    SelectableValue dtoToEntity(SelectableValueDto dto);
    @Mapping(target = "attributeId",source = "attribute.id")
    SelectableValueDto entityToDto(SelectableValue selectableValue);
    Set<SelectableValueDto> entitySetToDtoSet(Set<SelectableValue> values);
    List<SelectableValue> dtoListToEntitySet(Set<SelectableValueDto> dtoList);
    SelectableValue updateDtoToEntity(RequestUpdateSelValueDto dto);
    SelectableValue saveDtoToEntity(RequestSaveSelValueDto dto);
}
