package com.marketplace.order.dto.response;


import com.marketplace.order.models.Order;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class SimpleOrderResponseDto {
    private Long id;
    private LocalDateTime createdAt;
    private LocalDateTime modifyDate;
    private String orderAmount;
    private RecipientDto recipient;
    private ShippingAddressDto shippingAddress;
    private String status;

    public SimpleOrderResponseDto (Order order){
        this.id = order.getId();
        this.createdAt = order.getCreatedAt();
        this.modifyDate = order.getUpdatedAt();
        this.orderAmount = order.getAmount();
        this.status = order.getStatus().getStatus();
    }
    @Data
    public static class RecipientDto {
        private String name;
        private String surname;
        private String phone;
        private String email;
    }

    @Data
    public static class ShippingAddressDto {
        private String address;
        private String flat;
        private String floor;
        private String comment;
    }
}
