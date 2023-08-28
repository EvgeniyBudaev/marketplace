package com.marketplace.order.dto.request;


import lombok.Data;

import javax.validation.constraints.NotBlank;

@Data
public class OrderRequestDtoImpl{
    @NotBlank
    private String uuid;

}
