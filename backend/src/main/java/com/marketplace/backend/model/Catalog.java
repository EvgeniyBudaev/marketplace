package com.marketplace.backend.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

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

    @Column(name = "enabled")
    private boolean enabled;

    @OneToMany(mappedBy = "catalog",cascade = CascadeType.ALL,fetch = FetchType.LAZY)
    private List<Product> products;

   @ManyToMany(mappedBy = "catalog",fetch = FetchType.LAZY)
    private List<Attribute> attributes;
}
