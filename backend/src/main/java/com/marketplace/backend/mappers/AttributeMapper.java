package com.marketplace.backend.mappers;


import com.marketplace.backend.dto.attributes.request.RequestSaveAttribute;
import com.marketplace.backend.dto.attributes.response.ResponseAttributeForGetAll;
import com.marketplace.backend.dto.attributes.response.ResponseSingleAttribute;
import com.marketplace.backend.model.Attribute;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(uses = SelectableValueMapper.class)
public interface AttributeMapper {


    Attribute dtoToEntity(RequestSaveAttribute attributeDto);

    ResponseSingleAttribute entityToSingleAttributeDto(Attribute attribute);
    List<ResponseAttributeForGetAll> entitiesToListDto(List<Attribute> attributes);
}
