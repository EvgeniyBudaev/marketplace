package com.marketplace.order.models;

import com.marketplace.backend.model.Product;
import com.marketplace.cart.model.CartItem;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "order_items")
@Getter
@Setter
@NoArgsConstructor
public class OrderItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id")
    private Order order;

    @Column(name = "product_name")
    private String productName;

    @Column(name = "product_id")
    private Long productId;

    @Column(name = "price", columnDefinition = "DECIMAL(19,2), default '0.00'")
    private BigDecimal price;

    @Column(name = "quantity", nullable = false)
    private Integer quantity;


    public OrderItem (CartItem cartItem, Order order){
        this.order = order;
        Product product = cartItem.getProduct();
        this.productName = product.getName();
        this.productId = product.getId();
        this.price = product.getPrice();
        this.quantity = cartItem.getQuantity();
    }
}
