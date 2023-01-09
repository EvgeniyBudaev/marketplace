package com.marketplace.cart.dto.request;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
@Getter
@Setter
public class CartSetQuantityRequestDto implements CartRequestDto{
    private String uuid;
    @NotBlank
    private String productAlias;
    @NotNull
    @Positive
    private Integer newQuantity;

    @Override
    public String getUuid() {
        return null;
    }
}
