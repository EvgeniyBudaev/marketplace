package com.marketplace.backend.model;

import com.marketplace.backend.model.values.DoubleValue;
import com.marketplace.backend.model.values.IntegerValue;
import com.marketplace.backend.model.values.StringValue;
import lombok.Data;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "attributes")
@Data
public class Attribute {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "name")
    private String name;

    @Column(name = "enabled")
    private Boolean enabled;

    @Column(name = "type")
    @Enumerated(EnumType.STRING)
    private EAttributeType type;


    @ManyToMany
    @JoinTable(name = "attributes_catalogs",
    joinColumns = @JoinColumn(name = "attribute_id"),
    inverseJoinColumns = @JoinColumn(name = "catalog_id"))
    private List<Catalog> catalog;

    @OneToMany(mappedBy = "attribute")
    private List<StringValue> stringValue;

    @OneToMany(mappedBy = "attribute")
    private List<IntegerValue> integerValue;

    @OneToMany(mappedBy = "attribute")
    private List<DoubleValue> doubleValues;
}
