package com.marketplace.backend.model;

import com.marketplace.backend.model.values.BooleanValue;
import com.marketplace.backend.model.values.DoubleValue;
import com.marketplace.backend.model.values.SelectableValue;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "products")
@Getter
@Setter
@NoArgsConstructor
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

    @ManyToOne
    @JoinColumn(name = "catalog_id",nullable = false)
    private Catalog catalog;

    @OneToMany(mappedBy = "product",fetch = FetchType.LAZY)
    private List<DoubleValue> doubleValues;

    @OneToMany(mappedBy = "product",fetch = FetchType.LAZY)
    private List<BooleanValue> booleanValues;

    @ManyToMany(mappedBy = "products",fetch = FetchType.LAZY)
    private List<SelectableValue> selectableValues;
}
