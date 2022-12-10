package com.marketplace.backend.dto.attributes;

import com.marketplace.backend.model.Attribute;
import com.marketplace.backend.model.EAttributeType;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BaseAttributeDto {
    private Long id;
    private String name;
    private String alias;
    private EAttributeType type;
    private Boolean filter;

    public BaseAttributeDto(){}
    public BaseAttributeDto(Attribute attribute){
        this.setId(attribute.getId());
        this.setAlias(attribute.getAlias());
        this.setName(attribute.getName());
        this.setType(attribute.getType());
        this.setFilter(attribute.getFilter());
    }
}
