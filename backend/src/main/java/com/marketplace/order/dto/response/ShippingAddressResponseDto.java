package com.marketplace.order.dto.response;

import lombok.Data;

import java.time.LocalDateTime;
@Data
public class ShippingAddressResponseDto {
    private String address;
    private String flat;
    private String floor;
    private String comment;
    private LocalDateTime modifyDate;
}
