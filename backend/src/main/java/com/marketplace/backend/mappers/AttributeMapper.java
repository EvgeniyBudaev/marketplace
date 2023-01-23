package com.marketplace.backend.mappers;


import com.marketplace.backend.dto.attributes.request.RequestSaveOrUpdateAttribute;
import com.marketplace.backend.dto.attributes.response.ResponseAttributeForGetAll;
import com.marketplace.backend.dto.attributes.response.ResponseSingleAttribute;
import com.marketplace.backend.model.Attribute;

import org.mapstruct.CollectionMappingStrategy;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(uses = SelectableValueMapper.class, collectionMappingStrategy = CollectionMappingStrategy.SETTER_PREFERRED)
public interface AttributeMapper {

    Attribute dtoToEntity(RequestSaveOrUpdateAttribute attributeDto);
    ResponseSingleAttribute entityToSingleAttributeDto(Attribute attribute);
    List<ResponseAttributeForGetAll> entitiesToListDto(List<Attribute> attributes);
}
