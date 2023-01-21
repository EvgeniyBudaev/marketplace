package com.marketplace.backend.model.values;

import com.marketplace.backend.model.Attribute;
import com.marketplace.backend.model.Product;
import lombok.Getter;
import lombok.Setter;
import org.springframework.stereotype.Indexed;

import javax.persistence.*;

@MappedSuperclass
@Indexed
@Getter
@Setter
public class BaseValue {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @ManyToOne
    @JoinColumn(name = "attribute_id",nullable = false)
    private Attribute attribute;

    @ManyToOne
    @JoinColumn(name = "product_id",nullable = false)
    private Product product;
}
