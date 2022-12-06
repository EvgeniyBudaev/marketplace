package com.marketplace.backend.model;

import javax.persistence.*;

@Table(name = "products")
public class Product {
    @Column(name = "name", nullable = false, unique = true)
    private String name;

    @Column(name = "alias", nullable = false, unique = true)
    private String alias;
}
