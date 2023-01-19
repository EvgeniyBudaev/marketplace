package com.marketplace.cart.dto.response;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.marketplace.backend.model.Product;
import com.marketplace.backend.model.values.BooleanValue;
import com.marketplace.backend.model.values.DoubleValue;
import com.marketplace.backend.model.values.SelectableValue;
import com.marketplace.cart.model.Cart;
import com.marketplace.cart.model.CartItem;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

@Getter
@Setter
public class CartResponseDto {
    private String uuid;
    private LocalDateTime createdAt;
    private LocalDateTime modifyDate;
    private Set<CartItemDto> items;
    private String cartAmount;
    private String countProducts;

    public CartResponseDto(Cart cart) {
        this.uuid = cart.getSessionId().getUuid();
        this.createdAt = cart.getCreatedAt();
        this.modifyDate = cart.getModifyDate();
        Set<CartItem> entityItems = cart.getItems();
        if (entityItems == null || entityItems.isEmpty()) {
            this.cartAmount = "0";
            this.countProducts = "0";
            return;
        }
        this.items = entityItems.stream()
                .map(CartItemDto::new).collect(Collectors.toUnmodifiableSet());
        reCalculateAmount();
    }

    private void reCalculateAmount() {
        BigDecimal totalPrice = BigDecimal.ZERO;
        int countOfProductTemp = 0;
        for (CartItemDto o : items) {
            totalPrice = totalPrice.add(o.getAmountForCalculate());
            countOfProductTemp = countOfProductTemp + o.quantity;
        }
        this.cartAmount = totalPrice.toString();
        this.countProducts = String.valueOf(countOfProductTemp);
    }

    @Getter
    @Setter
    private static class CartItemDto {
        private Long id;
        private ProductDto product;
        private Integer quantity;
        private String price;
        private String amount;

        @JsonIgnore
        private BigDecimal amountForCalculate;

        public CartItemDto(CartItem item) {
            this.id = item.getId();
            Product entityProduct = item.getProduct();
            this.product = new ProductDto(entityProduct);
            this.quantity = item.getQuantity();
            this.price = entityProduct.getPrice().toString();
            this.amountForCalculate = entityProduct.getPrice().multiply(BigDecimal.valueOf(quantity));
            this.amountForCalculate = this.amountForCalculate.setScale(2, RoundingMode.HALF_UP);
            this.amount = this.amountForCalculate.toString();
        }
    }

    @Getter
    @Setter
    public static class ProductDto {
        private String catalogAlias;
        private Long id;
        private String name;
        private String alias;
        private Boolean enabled;
        private String description;
        private Double rating;
        private String price;
        private String count;
        private LocalDateTime createdAt;
        private Set<AttributeValueDto> attributes = new HashSet<>();

        @Getter
        @Setter
        public static class AttributeValueDto {
            private String attributeName;
            private String value;
        }

        public ProductDto(Product product) {
            this.setCatalogAlias(product.getCatalog().getAlias());
            this.setId(product.getId());
            this.setName(product.getName());
            this.setAlias(product.getAlias());
            this.setEnabled(product.getEnabled());
            this.setPrice(product.getPrice().toString());
            this.setCount(String.valueOf(product.getCount()));
            this.setCreatedAt(product.getCreatedAt());
            this.setDescription(product.getDescription());
            this.setRating(product.getRating());
            this.getAttributes().addAll(convertDoubleValueToDto(product.getDoubleValues()));
            this.getAttributes().addAll(convertIntegerValueToDto(product.getBooleanValues()));
            this.getAttributes().addAll(convertSelectValueToDto(product.getSelectableValues()));
        }


        private Set<AttributeValueDto> convertDoubleValueToDto(Set<DoubleValue> list) {
            Set<AttributeValueDto> result = new HashSet<>();
            if (list == null) {
                return result;
            }
            for (DoubleValue doubleValue : list) {
                AttributeValueDto valueDto = new AttributeValueDto();
                valueDto.setValue(doubleValue.getValue().toString());
                valueDto.setAttributeName(doubleValue.getAttribute().getName());
                result.add(valueDto);
            }
            return result;
        }

        private Set<AttributeValueDto> convertIntegerValueToDto(Set<BooleanValue> list) {
            Set<AttributeValueDto> result = new HashSet<>();
            if (list == null) {
                return result;
            }
            for (BooleanValue booleanValue : list) {
                AttributeValueDto valueDto = new AttributeValueDto();
                valueDto.setValue(booleanValue.getValue().toString());
                valueDto.setAttributeName(booleanValue.getAttribute().getName());
                result.add(valueDto);
            }
            return result;
        }

        private Set<AttributeValueDto> convertSelectValueToDto(Set<SelectableValue> list) {
            Set<AttributeValueDto> result = new HashSet<>();
            if (list == null) {
                return result;
            }
            for (SelectableValue selectableValue : list) {
                AttributeValueDto valueDto = new AttributeValueDto();
                valueDto.setValue(selectableValue.getValue());
                valueDto.setAttributeName(selectableValue.getAttribute().getName());
                result.add(valueDto);
            }
            return result;
        }

    }
}
