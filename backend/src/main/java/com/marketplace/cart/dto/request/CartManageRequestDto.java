package com.marketplace.cart.dto.request;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
public class CartManageRequestDto implements CartRequestDto{
    @NotBlank
    private String uuid;
    @NotBlank
    private String productAlias;
}
