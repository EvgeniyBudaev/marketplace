package com.marketplace.backend.dto.attributes.response;

import com.marketplace.backend.dto.attributes.BaseAttributeDto;
import com.marketplace.backend.model.Attribute;

public class ResponseAttributeForGetAll extends BaseAttributeDto {
    public ResponseAttributeForGetAll(Attribute attribute){
        super(attribute);
    }
}
