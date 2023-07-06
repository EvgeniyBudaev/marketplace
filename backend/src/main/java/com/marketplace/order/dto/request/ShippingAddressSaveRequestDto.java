package com.marketplace.order.dto.request;

import lombok.Data;


@Data
public class ShippingAddressSaveRequestDto {
    private String uuid;
    private String address;
    private String flat;
    private String floor;
    private String comment;
}
