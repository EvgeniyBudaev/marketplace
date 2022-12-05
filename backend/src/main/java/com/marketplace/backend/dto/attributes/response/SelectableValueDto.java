package com.marketplace.backend.dto.attributes.response;

import com.marketplace.backend.model.values.SelectableValue;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SelectableValueDto {
    private Long id;
    private Long attributeId;
    private String value;

    public SelectableValueDto(){}
    public SelectableValueDto(SelectableValue selectableValue){
        this.id = selectableValue.getId();
        this.attributeId = selectableValue.getId();
        this.value = selectableValue.getValue();
    }
}

