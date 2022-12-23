package com.marketplace.backend.model;

import com.marketplace.backend.model.values.BooleanValue;
import com.marketplace.backend.model.values.DoubleValue;
import com.marketplace.backend.model.values.SelectableValue;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Set;

@Entity
@Table(name = "products")
@Getter
@Setter
@NoArgsConstructor
@NamedEntityGraph(name = "product-with-all-fields",attributeNodes = {
        @NamedAttributeNode("id"),
        @NamedAttributeNode("name"),
        @NamedAttributeNode("description"),
        @NamedAttributeNode("alias"),
        @NamedAttributeNode("enabled"),
        @NamedAttributeNode("count"),
        @NamedAttributeNode("price"),
        @NamedAttributeNode("rating"),
        @NamedAttributeNode(value = "catalog",subgraph = "catalog-subgraph"),
        @NamedAttributeNode(value = "doubleValues",subgraph = "attribute-subgraph"),
        @NamedAttributeNode(value = "booleanValues",subgraph = "attribute-subgraph"),
        @NamedAttributeNode(value = "selectableValues",subgraph = "attribute-subgraph")
},subgraphs = {
        @NamedSubgraph(name = "catalog-subgraph",attributeNodes = {
                @NamedAttributeNode("alias")
        }),
        @NamedSubgraph(name = "attribute-subgraph",attributeNodes = {
                @NamedAttributeNode("id"),
                @NamedAttributeNode("value"),
                @NamedAttributeNode("attribute")
        })
})
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name", nullable = false, unique = true)
    private String name;

    @Column(name = "description")
    private String description;

    @Column(name = "alias", nullable = false, unique = true)
    private String alias;

    @Column(name = "enabled")
    private Boolean enabled;

    @Column(name = "count", nullable = false)
    private int count;

    @Column(name = "price")
    private String price;

    @Column(name = "rating", nullable = false)
    private double rating;

    @Column(name = "created_at")
    @CreatedDate
    private LocalDateTime createdAt;

    @ManyToOne
    @JoinColumn(name = "catalog_id",nullable = false)
    private Catalog catalog;

    @OneToMany(mappedBy = "product",fetch = FetchType.LAZY)
    private Set<DoubleValue> doubleValues;

    @OneToMany(mappedBy = "product",fetch = FetchType.LAZY)
    private Set<BooleanValue> booleanValues;

    @ManyToMany(mappedBy = "products",fetch = FetchType.LAZY)
    private Set<SelectableValue> selectableValues;
}
