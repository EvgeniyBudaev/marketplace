package com.marketplace.backend.dto.attributes.response;

import com.marketplace.backend.dto.attributes.BaseAttributeDto;
import com.marketplace.backend.model.Attribute;

public class ResponseNonSelectableAttributeAfterSave extends BaseAttributeDto {
    public ResponseNonSelectableAttributeAfterSave(Attribute attribute){
        super(attribute);
    }
}
