package com.marketplace.backend.dto.attributes;

import com.marketplace.backend.dto.attributes.response.SelectableValueDto;
import com.marketplace.backend.model.Attribute;
import com.marketplace.backend.model.values.SelectableValue;

public class AttributeConverter {

    public Attribute baseAttributeToEntity(BaseAttributeDto dto){
        Attribute attribute = new Attribute();
        attribute.setId(dto.getId());
        attribute.setName(dto.getName());
        attribute.setAlias(dto.getAlias());
        attribute.setEnabled(true);
        attribute.setType(dto.getType());
        return attribute;
    }

    public SelectableValue selectableValueDtoToEntity(SelectableValueDto dto, Attribute attribute){
        SelectableValue entity = new SelectableValue();
        entity.setId(dto.getId());
        entity.setValue(dto.getValue());
        entity.setAttribute(attribute);
        return entity;
    }
}
