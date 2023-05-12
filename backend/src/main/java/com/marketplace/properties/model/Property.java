package com.marketplace.properties.model;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Type;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "properties")
@Getter
@Setter
public class Property {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "property_type", nullable = false, unique = true)
    @Enumerated(EnumType.STRING)
    private EPropertiesType propertiesType;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime modifyDate;

    @Column(name = "property", nullable = false)
    @Type(type = "text")
    private String property;

}
