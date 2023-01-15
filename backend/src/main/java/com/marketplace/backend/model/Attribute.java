package com.marketplace.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.marketplace.backend.model.values.BooleanValue;
import com.marketplace.backend.model.values.DoubleValue;
import com.marketplace.backend.model.values.SelectableValue;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "attributes")
@Getter
@Setter
@NoArgsConstructor
public class Attribute {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "alias", nullable = false, unique = true)
    private String alias;

    @Column(name = "enabled")
    private Boolean enabled;

    @Column(name = "filter")
    private Boolean filter;

    @Column(name = "type")
    @Enumerated(EnumType.STRING)
    private EAttributeType type;

    @JsonIgnore
    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "attributes_catalogs",
    joinColumns = @JoinColumn(name = "attribute_id"),
    inverseJoinColumns = @JoinColumn(name = "catalog_id"))
    private List<Catalog> catalog;

    @JsonIgnore
    @OneToMany(mappedBy = "attribute",fetch = FetchType.LAZY,cascade = CascadeType.PERSIST)
    private List<SelectableValue> singleSelectableValue;

    @JsonIgnore
    @OneToMany(mappedBy = "attribute",fetch = FetchType.LAZY)
    private List<BooleanValue> booleanValue;

    @JsonIgnore
    @OneToMany(mappedBy = "attribute",fetch = FetchType.LAZY)
    private List<DoubleValue> doubleValues;
}
