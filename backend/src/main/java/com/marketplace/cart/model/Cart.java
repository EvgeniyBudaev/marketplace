package com.marketplace.cart.model;

import com.marketplace.users.model.SessionId;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Objects;
import java.util.Set;

@Entity
@Table(name = "carts")
@Getter
@Setter
@NamedEntityGraph(name = "cart-with-items-and-full-product", attributeNodes = {
        @NamedAttributeNode("id"),
        @NamedAttributeNode(value = "sessionId",subgraph = "session"),
        @NamedAttributeNode("createdAt"),
        @NamedAttributeNode("modifyDate"),
        @NamedAttributeNode(value = "items",subgraph = "items-subgraph"),
},subgraphs = {
        @NamedSubgraph(name = "items-subgraph",attributeNodes = {
                @NamedAttributeNode("id"),
                @NamedAttributeNode("quantity"),
                @NamedAttributeNode(value = "product",subgraph = "product-for-cart")

        }),
        @NamedSubgraph(name = "product-for-cart",attributeNodes = {
                @NamedAttributeNode("id"),
                @NamedAttributeNode("name"),
                @NamedAttributeNode("description"),
                @NamedAttributeNode("alias"),
                @NamedAttributeNode("enabled"),
                @NamedAttributeNode("count"),
                @NamedAttributeNode("price"),
                @NamedAttributeNode("rating"),
                @NamedAttributeNode(value = "catalog",subgraph = "catalog-subgraph-cart"),
                @NamedAttributeNode(value = "doubleValues",subgraph = "attribute-subgraph-cart"),
                @NamedAttributeNode(value = "booleanValues",subgraph = "attribute-subgraph-cart"),
                @NamedAttributeNode(value = "selectableValues",subgraph = "attribute-subgraph-cart")
        }),
        @NamedSubgraph(name = "catalog-subgraph-cart",attributeNodes = {
                @NamedAttributeNode("alias")
        }),
        @NamedSubgraph(name = "attribute-subgraph-cart",attributeNodes = {
                @NamedAttributeNode("id"),
                @NamedAttributeNode("value"),
                @NamedAttributeNode("attribute")
        }),
        @NamedSubgraph(name = "session",attributeNodes = {
                @NamedAttributeNode("uuid")
        })
})
public class Cart {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @OneToOne(mappedBy = "cart")
    private SessionId sessionId;

    @CreationTimestamp
    @Column(name = "created_at",updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime modifyDate;

    @OneToMany(mappedBy = "cart",cascade = CascadeType.ALL)
    private Set<CartItem> items;


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Cart cart)) return false;
        return id.equals(cart.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
