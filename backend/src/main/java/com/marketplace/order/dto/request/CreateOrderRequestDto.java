package com.marketplace.order.dto.request;

import lombok.Data;

@Data
public class CreateOrderRequestDto {
    private String uuid;
    private Long paymentVariantId;
}
