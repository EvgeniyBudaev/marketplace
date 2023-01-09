package com.marketplace.cart.model;

import com.marketplace.users.model.AppUser;
import lombok.Getter;
import lombok.Setter;
import org.apache.commons.lang3.builder.EqualsBuilder;
import org.apache.commons.lang3.builder.HashCodeBuilder;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Set;

@Entity
@Table(name = "carts")
@Getter
@Setter
@NamedEntityGraph(name = "cart-with-items-and-full-product", attributeNodes = {
        @NamedAttributeNode("id"),
        @NamedAttributeNode("uuid"),
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
        })
})
public class Cart {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @OneToOne
    @JoinColumn(name = "user_id")
    private AppUser user;

    @Column(name = "uuid",unique = true)
    private String uuid;

    @CreationTimestamp
    @Column(name = "created_at",updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime modifyDate;

    @OneToMany(mappedBy = "cart")
    private Set<CartItem> items;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;

        if (o == null || getClass() != o.getClass()) return false;

        Cart cart = (Cart) o;

        return new EqualsBuilder().append(uuid, cart.uuid).isEquals();
    }

    @Override
    public int hashCode() {
        return new HashCodeBuilder(17, 37).append(uuid).toHashCode();
    }
}
