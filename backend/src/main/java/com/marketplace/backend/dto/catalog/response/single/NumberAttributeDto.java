package com.marketplace.backend.dto.catalog.response.single;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class NumberAttributeDto {
    private Long id;
    private String name;
    private String alias;
    private Double min;
    private Double max;
}