package com.marketplace.backend.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Objects;
import java.util.Set;

@Entity
@Table(name = "catalogs")
@Getter
@Setter
@NoArgsConstructor
@NamedEntityGraph(name = "catalog-with-full-attributes",attributeNodes = {
        @NamedAttributeNode("id"),
        @NamedAttributeNode("name"),
        @NamedAttributeNode("alias"),
        @NamedAttributeNode("image"),
        @NamedAttributeNode("enabled"),
        @NamedAttributeNode(value = "attributes",subgraph = "attribute-with-value")
},subgraphs =
        {@NamedSubgraph(name = "attribute-with-value",attributeNodes = {
                @NamedAttributeNode("name"),
                @NamedAttributeNode("alias"),
                @NamedAttributeNode("enabled"),
                @NamedAttributeNode("filter"),
                @NamedAttributeNode("type"),
                @NamedAttributeNode("name"),
        }),
})
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

    @Column(name = "enabled",nullable = false)
    private boolean enabled;

    @OneToMany(mappedBy = "catalog",cascade = CascadeType.ALL,fetch = FetchType.LAZY)
    private Set<Product> products;

   @ManyToMany(mappedBy = "catalog",cascade = {CascadeType.PERSIST,CascadeType.DETACH},fetch = FetchType.LAZY)
    private Set<Attribute> attributes;

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
        Catalog catalog = (Catalog) o;
        return Objects.equals(id, catalog.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }

    public void addAttribute(Attribute attribute){
        this.attributes.add(attribute);
        attribute.getCatalog().add(this);
    }

    public void removeAttribute(Attribute attribute){
        this.attributes.remove(attribute);
        attribute.getCatalog().remove(this);
    }

}
