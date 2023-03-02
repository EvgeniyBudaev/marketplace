package com.marketplace.backend.dto.product.request;

import lombok.Data;

import javax.validation.constraints.NotNull;
@Data
public class NumericValue {
    @NotNull
    private String attributeAlias;
    @NotNull
    private Double value;
}
