package com.marketplace.cart.dto.request;

import lombok.Setter;

import javax.validation.constraints.NotBlank;

@Setter
public class CartRequestDtoImpl implements CartRequestDto {
    @NotBlank
    private String uuid;

    @Override
    public String getUuid() {
        return this.uuid;
    }
}
