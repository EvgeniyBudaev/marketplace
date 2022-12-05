package com.marketplace.backend.dto.attributes.response;

import com.marketplace.backend.dto.attributes.BaseAttributeDto;
import com.marketplace.backend.model.Attribute;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
@Getter
@Setter
public class ResponseSelectableAttributeAfterSave extends BaseAttributeDto {
    private List<SelectableValueDto> selectable;
    public ResponseSelectableAttributeAfterSave(Attribute attribute){
        super(attribute);
    }
}
