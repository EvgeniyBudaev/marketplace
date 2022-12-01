package com.marketplace.backend.model;

import com.marketplace.backend.model.values.DoubleValue;
import com.marketplace.backend.model.values.IntegerValue;
import com.marketplace.backend.model.values.StringValue;
import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.PositiveOrZero;
import java.util.List;

@Entity
@Table(name = "products")
@Data
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

    /*TODO наверное лучше проверки осуществлять на DTO а не на сущности*/
    @PositiveOrZero
    @Column(name = "count", nullable = false)
    private int count;

    @Column(name = "price")
    private String price;

    /*TODO А рейтинг с фронта прилетать будет? Если нет и бэкенд сам расчивает то проверка излишна*/
    @PositiveOrZero
    @Column(name = "rating", nullable = false)
    private double rating;

    @ManyToOne
    @JoinColumn(name = "catalog_id",nullable = false)
    private Catalog catalog;

    @OneToMany(mappedBy = "product")
    private List<DoubleValue> doubleValues;

    @OneToMany(mappedBy = "product")
    private List<IntegerValue> integerValues;

    @OneToMany(mappedBy = "product")
    private List<StringValue> stringValues;
}
