package com.marketplace.backend.model.values;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "integer_value")
@Getter
@Setter
public class IntegerValue extends BaseValue{

    @Column(name = "value")
    private Integer value;

}
