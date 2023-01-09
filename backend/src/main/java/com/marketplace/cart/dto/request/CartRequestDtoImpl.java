package com.marketplace.cart.dto.request;

import lombok.Setter;

@Setter
public class CartRequestDtoImpl implements CartRequestDto{
    private String uuid;
    @Override
    public String getUuid() {
        return this.uuid;
    }
}
