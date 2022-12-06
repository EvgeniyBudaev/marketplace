package com.marketplace.backend.dto.attributes;

import com.marketplace.backend.model.Attribute;

public class AttributeConverter {

    public Attribute baseAttributeToEntity(BaseAttributeDto dto){
        Attribute attribute = new Attribute();
        attribute.setId(dto.getId());
        attribute.setName(dto.getName());
        attribute.setAlias(dto.getAlias());
        attribute.setEnabled(true);
        attribute.setType(dto.getType());
        attribute.setFilter(dto.getFilter());
        return attribute;
    }


}
