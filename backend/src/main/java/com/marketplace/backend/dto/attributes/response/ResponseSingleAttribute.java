package com.marketplace.backend.dto.attributes.response;

import com.marketplace.backend.model.EAttributeType;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class ResponseSingleAttribute {
    private Long id;
    private String name;
    private String alias;
    private EAttributeType type;
    private Boolean filter;
    private List<SelectableValueDto> selectable;
}
