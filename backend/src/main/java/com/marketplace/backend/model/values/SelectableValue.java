package com.marketplace.backend.model.values;

import com.marketplace.backend.model.Attribute;
import com.marketplace.backend.model.Product;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;
import java.util.Objects;

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

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        SelectableValue that = (SelectableValue) o;
        return Objects.equals(id, that.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
