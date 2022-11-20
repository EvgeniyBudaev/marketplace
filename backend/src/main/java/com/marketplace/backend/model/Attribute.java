package com.marketplace.backend.model;

import lombok.Data;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.annotations.SelectBeforeUpdate;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "attributes")
@Data
@DynamicUpdate
@DynamicInsert
@SelectBeforeUpdate
public class Attribute {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "attribute_id")
    private Set<MirrorAttribute> mirrorAttributes;
}
