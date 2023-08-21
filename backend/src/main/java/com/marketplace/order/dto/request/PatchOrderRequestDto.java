package com.marketplace.order.dto.request;



import lombok.Data;

import java.math.BigDecimal;
import java.util.List;

@Data
public class PatchOrderRequestDto {
    private Long id;
    private RecipientDto recipient;
    private ShippingAddressDto shippingAddress;
    private String status;
    private Long paymentVariantId;
    private List<OrderItemDto> items;


    @Data
    public static class OrderItemDto{
        private Long id;
        private Long productId;
        private String name;
        private BigDecimal price;
        private Integer quantity;
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
