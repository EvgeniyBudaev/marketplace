package com.marketplace.backend.dto.catalog.response.single;

import lombok.Data;

import java.util.Set;

@Data
public class SelectAttributeDto {
    private Long id;
    private String name;
    private String alias;
    private Set<SelectValueDto> values;
}
