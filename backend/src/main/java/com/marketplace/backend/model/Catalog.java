package com.marketplace.backend.model;

import lombok.Data;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.annotations.SelectBeforeUpdate;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "catalogs")
@Data
@DynamicUpdate
@DynamicInsert
@SelectBeforeUpdate
public class Catalog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name", nullable = false, unique = true)
    private String name;

    @Column(name = "alias", nullable = false, unique = true)
    private String alias;

    @Column(name = "image", nullable = false)
    private String image;

    @Column(name = "enabled")
    private boolean enabled;

    @OneToMany(mappedBy = "catalog",cascade = CascadeType.ALL)
    private List<Product> products;
}
