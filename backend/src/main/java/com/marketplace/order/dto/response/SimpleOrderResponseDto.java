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
        this.shippingAddress = new ShippingAddressDto();
        this.shippingAddress.address = order.getAddress();
        this.shippingAddress.flat = order.getFlat();
        this.shippingAddress.floor = order.getFloor();
        this.shippingAddress.comment = order.getComment();
        this.recipient = new RecipientDto();
        if(order.getRecipientName().contains(" ")){
            String[] name = order.getRecipientName().split(" ");
            this.recipient.setName(name[0]);
            this.recipient.setSurname(name[1]);
        }else {
            this.recipient.setName(order.getRecipientName());
        }
        this.recipient.email = order.getRecipientEmail();
        this.recipient.phone = order.getRecipientPhone();
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
