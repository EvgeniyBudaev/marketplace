package com.marketplace.backend.model.values;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "boolean_value")
@Getter
@Setter
public class BooleanValue extends BaseValue{

    @Column(name = "value")
    private Boolean value;

}
