package com.marketplace.backend.model;

import javax.persistence.*;

@Table(name = "catalogs")
public class Catalog {
    @Column(name = "name", nullable = false, unique = true)
    private String name;

    @Column(name = "alias", nullable = false, unique = true)
    private String alias;
}
