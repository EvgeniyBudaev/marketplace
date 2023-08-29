package com.marketplace.order.dto.response;

import com.marketplace.order.models.PaymentVariant;
import lombok.Data;



@Data
public class PaymentVariantsResponseDto {
        private Long id;
        private String name;

        public PaymentVariantsResponseDto(PaymentVariant paymentVariant){
            this.id = paymentVariant.getId();
            this.name = paymentVariant.getName();
        }

}
