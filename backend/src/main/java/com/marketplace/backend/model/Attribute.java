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
import java.util.List;

@Entity
@Table(name = "attributes")
@Getter
@Setter
@NoArgsConstructor
@NamedEntityGraph(name = "attribute-with-selectable-values",attributeNodes = {
        @NamedAttributeNode("id"),
        @NamedAttributeNode("name"),
        @NamedAttributeNode("alias"),
        @NamedAttributeNode("filter"),
        @NamedAttributeNode("type"),
        @NamedAttributeNode(value = "singleSelectableValue",subgraph = "select-values")
},subgraphs = {
        @NamedSubgraph(name = "select-values",attributeNodes = {
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

    @ManyToMany(fetch = FetchType.LAZY,cascade = {})
    @JoinTable(name = "attributes_catalogs",
    joinColumns = @JoinColumn(name = "attribute_id"),
    inverseJoinColumns = @JoinColumn(name = "catalog_id"))
    private List<Catalog> catalog;

    @JsonIgnore
    @OneToMany(mappedBy = "attribute",fetch = FetchType.LAZY,cascade = {CascadeType.PERSIST, CascadeType.REMOVE},orphanRemoval = true)
    private List<SelectableValue> singleSelectableValue;

    @JsonIgnore
    @OneToMany(mappedBy = "attribute",fetch = FetchType.LAZY)
    private List<BooleanValue> booleanValue;

    @JsonIgnore
    @OneToMany(mappedBy = "attribute",fetch = FetchType.LAZY)
    private List<DoubleValue> doubleValues;
    @CreationTimestamp
    @Column(name = "created_at",updatable = false)
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

    @Override
    public String toString() {
        return "Attribute{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", alias='" + alias + '\'' +
                ", enabled=" + enabled +
                ", filter=" + filter +
                ", type=" + type +
                ", catalog=" + catalog +
                ", singleSelectableValue=" + singleSelectableValue +
                ", booleanValue=" + booleanValue +
                ", doubleValues=" + doubleValues +
                ", createdAt=" + createdAt +
                ", modifyDate=" + modifyDate +
                '}';
    }
}
