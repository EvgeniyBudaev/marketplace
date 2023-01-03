package com.marketplace.properties.model;

import com.marketplace.properties.model.convertes.EmailPropertiesConverter;
import com.marketplace.properties.model.convertes.EmailProperty;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "email_properties")
@Getter
@Setter
public class EmailProperties {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "property_type")
    @Enumerated(EnumType.STRING)
    private EEmailPropertiesType propertiesType;

    @Column(name = "profile_name")
    private String profileName;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime modifyDate;

    @Column(name = "properties")
    @Convert(converter = EmailPropertiesConverter.class)
    private EmailProperty emailProperty;
}
