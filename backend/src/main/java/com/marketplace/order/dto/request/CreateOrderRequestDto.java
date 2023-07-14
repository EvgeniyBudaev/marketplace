package com.marketplace.order.dto.request;

import com.marketplace.order.models.EPaymentVariants;
import lombok.Data;

@Data
public class CreateOrderRequestDto {
    private String session;
    private EPaymentVariants payment;
}
