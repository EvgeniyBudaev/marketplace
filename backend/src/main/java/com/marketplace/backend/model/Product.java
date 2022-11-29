package com.marketplace.backend.model;

import lombok.Data;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.annotations.SelectBeforeUpdate;

import javax.persistence.*;
import javax.validation.constraints.PositiveOrZero;

@Entity
@Table(name = "products")
@Data
@DynamicUpdate
@DynamicInsert
@SelectBeforeUpdate
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

    /* Поле enabled это и есть статус*/
    @Column(name = "enabled")
    private Boolean enabled;

    @PositiveOrZero
    @Column(name = "count", nullable = false)
    private int count;

    @Column(name = "price")
    private String price;

    @PositiveOrZero
    @Column(name = "rating", nullable = false)
    private double rating;

    /* TODO: Добавить поля image, dateCreated, dateUpdated*/

    @ManyToOne
    @JoinColumn(name = "catalog_id",nullable = false)
    private Catalog catalog;

}
