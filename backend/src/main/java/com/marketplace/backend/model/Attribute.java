package com.marketplace.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.marketplace.backend.model.values.BooleanValue;
import com.marketplace.backend.model.values.DoubleValue;
import com.marketplace.backend.model.values.SelectableValue;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.apache.commons.lang3.builder.EqualsBuilder;
import org.apache.commons.lang3.builder.HashCodeBuilder;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "attributes")
@Getter
@Setter
@NoArgsConstructor
@NamedEntityGraph(name = "attribute-with-selectable-values", attributeNodes = {
        @NamedAttributeNode("id"),
        @NamedAttributeNode("name"),
        @NamedAttributeNode("alias"),
        @NamedAttributeNode("filter"),
        @NamedAttributeNode("type"),
        @NamedAttributeNode(value = "singleSelectableValue", subgraph = "select-values")
}, subgraphs = {
        @NamedSubgraph(name = "select-values", attributeNodes = {
                @NamedAttributeNode("id"),
                @NamedAttributeNode("value")
        })
})
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

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "attributes_catalogs",
            joinColumns = @JoinColumn(name = "attribute_id"),
            inverseJoinColumns = @JoinColumn(name = "catalog_id"))
    private Set<Catalog> catalog;

    @JsonIgnore
    @OneToMany(mappedBy = "attribute", fetch = FetchType.LAZY, cascade = {CascadeType.PERSIST, CascadeType.REMOVE, CascadeType.DETACH}, orphanRemoval = true)
    private Set<SelectableValue> singleSelectableValue = new HashSet<>();

    @JsonIgnore
    @OneToMany(mappedBy = "attribute", fetch = FetchType.LAZY)
    private List<BooleanValue> booleanValue = new ArrayList<>();

    @JsonIgnore
    @OneToMany(mappedBy = "attribute", fetch = FetchType.LAZY)
    private List<DoubleValue> doubleValues = new ArrayList<>();
    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime modifyDate;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;

        if (o == null || getClass() != o.getClass()) return false;

        Attribute attribute = (Attribute) o;

        return new EqualsBuilder().append(id, attribute.id).isEquals();
    }

    @Override
    public int hashCode() {
        return new HashCodeBuilder(17, 37).append(id).toHashCode();
    }

    public Set<Catalog> getCatalog() {
        return catalog;
    }

    public void setCatalog(Set<Catalog> catalog) {
        this.catalog = catalog;
    }


    public void addSelValue(SelectableValue value) {
        this.singleSelectableValue.add(value);
        value.setAttribute(this);
    }

    public void removeSelValue(SelectableValue value) {
        this.singleSelectableValue.remove(value);
        value.setAttribute(null);
    }


}
