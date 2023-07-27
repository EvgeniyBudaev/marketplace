package com.marketplace.order.dto.response;


import com.fasterxml.jackson.annotation.JsonIgnore;

import com.marketplace.order.models.Order;
import com.marketplace.order.models.OrderItem;
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

    public OrderResponseDto(Order order, String productBaseUrl) {
        this.createdAt = order.getCreatedAt();
        this.modifyDate = order.getUpdatedAt();
        this.orderAmount = order.getAmount();
        this.items = new HashSet<>(order.getOrderItems().size());
        final int[] count = {0};
        order.getOrderItems().forEach(x->{
            count[0] = count[0] +1;
            this.items.add(new OrderItemDto(x,productBaseUrl));
        });
        this.countProducts = count[0];
    }



    @Getter
    @Setter
    private static class OrderItemDto {
        private Long id;
        private Integer quantity;
        private String name;
        private String image;
        private String price;
        private String amount;

        @JsonIgnore
        private BigDecimal amountForCalculate;

        public OrderItemDto(OrderItem item, String productBaseUrl) {
            this.id = item.getId();
            this.quantity = item.getQuantity();
            this.price =item.getPrice().toString();
            this.amount = item.getAmount().toString();
            this.name = item.getProductName();
        }
    }


}
