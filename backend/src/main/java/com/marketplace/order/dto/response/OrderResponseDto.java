package com.marketplace.order.dto.response;


import com.fasterxml.jackson.annotation.JsonIgnore;


import com.marketplace.order.models.Order;
import com.marketplace.order.models.OrderItem;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
public class OrderResponseDto {
    private LocalDateTime createdAt;
    private LocalDateTime modifyDate;
    private Set<OrderItemDto> items;
    private String orderAmount;
    private Integer countProducts;
    private RecipientDto recipient;
    private ShippingAddressDto shippingAddress;
    private String paymentVariant;
    private String status;

    public OrderResponseDto(Order order, String productBaseUrl) {
        this.createdAt = order.getCreatedAt();
        this.paymentVariant = order.getPaymentVariant().getName();
        this.modifyDate = order.getUpdatedAt();
        this.orderAmount = order.getAmount();
        this.recipient = new RecipientDto();
        this.recipient.setEmail(order.getRecipientEmail());
        this.recipient.setPhone(order.getRecipientPhone());
        if(order.getRecipientName().contains(" ")){
            String[] name = order.getRecipientName().split(" ");
            this.recipient.setName(name[0]);
            this.recipient.setSurname(name[1]);
        }else {
            this.recipient.setName(order.getRecipientName());
        }
        this.shippingAddress = new ShippingAddressDto();
        this.shippingAddress.setComment(order.getComment());
        this.shippingAddress.setAddress(order.getAddress());
        this.shippingAddress.setFlat(order.getFlat());
        this.shippingAddress.setFloor(order.getFloor());
        this.items = new HashSet<>(order.getOrderItems().size());
        final int[] count = {0};
        order.getOrderItems().forEach(x->{
            count[0] = count[0] +1;
            this.items.add(new OrderItemDto(x,productBaseUrl));
        });
        this.status = order.getStatus().getStatus();
        this.countProducts = count[0];
    }



    @Getter
    @Setter
    private static class OrderItemDto {
        private Long id;
        private Long productId;
        private Integer quantity;
        private String name;
        private String image;
        private String price;
        private String amount;

        @JsonIgnore
        private BigDecimal amountForCalculate;

        public OrderItemDto(OrderItem item, String productBaseUrl) {
            this.id = item.getId();
            this.productId = item.getProductId();
            this.quantity = item.getQuantity();
            this.price =item.getPrice().toString();
            this.amount = item.getAmount().toString();
            this.name = item.getProductName();
        }
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
