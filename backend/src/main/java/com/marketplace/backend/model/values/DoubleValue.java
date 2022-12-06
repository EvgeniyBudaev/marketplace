package com.marketplace.backend.model.values;


import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "double_value")
@Getter
@Setter
public class DoubleValue extends BaseValue{

    @Column(name = "value")
    private Double value;

}
