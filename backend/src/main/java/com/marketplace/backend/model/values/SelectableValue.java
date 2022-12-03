package com.marketplace.backend.model.values;

import com.marketplace.backend.model.Attribute;
import com.marketplace.backend.model.Product;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "selectable_values")
@Getter
@Setter
public class SelectableValue {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "attribute_id")
    private Attribute attribute;

    @ManyToMany
    @JoinTable(name = "products_selectable",
    joinColumns = @JoinColumn(name = "selectable_value_id"),
    inverseJoinColumns = @JoinColumn(name = "product_id"))
    private List<Product> products;

    @Column(name = "value")
    private String value;
}
