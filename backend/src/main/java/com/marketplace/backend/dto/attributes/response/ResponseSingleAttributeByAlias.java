package com.marketplace.backend.dto.attributes.response;

import com.marketplace.backend.dto.attributes.BaseAttributeDto;
import com.marketplace.backend.model.Attribute;
import com.marketplace.backend.model.values.SelectableValue;
import lombok.Getter;
import lombok.Setter;

import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

@Getter
@Setter
public class ResponseSingleAttributeByAlias extends BaseAttributeDto {
    private List<SelectableValueDto> selectable;

    public ResponseSingleAttributeByAlias(){
        super();
    }
    public ResponseSingleAttributeByAlias(Attribute attribute){
        super(attribute);
    }
    public ResponseSingleAttributeByAlias(Attribute attribute, Collection<SelectableValue> singleSelectableValue){
        super(attribute);
        this.selectable = singleSelectableValue.stream()
                .map(SelectableValueDto::new).collect(Collectors.toList());
    }
}
