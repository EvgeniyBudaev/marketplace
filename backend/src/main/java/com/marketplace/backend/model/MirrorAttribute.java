package com.marketplace.backend.model;

import lombok.Data;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.annotations.SelectBeforeUpdate;

import javax.persistence.*;

@Entity
@Table(name = "mirrorAttributes")
@Data
@DynamicUpdate
@DynamicInsert
@SelectBeforeUpdate
public class MirrorAttribute {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /*     FORM_TYPES = (
        ('Круглая', 'Круглая'),
        ('Овальная', 'Овальная'),
        ('Прямоугольная', 'Прямоугольная'),
        ('Фигурная', 'Фигурная'),
    ) */

    /* TODO: сделать выбор из FORM_TYPES */
    @Column(name = "form")
    private String form;

    @Column(name = "weight")
    private double weight;
}
