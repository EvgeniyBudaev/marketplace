package com.marketplace.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "files")
@Getter
@Setter
public class ProductFile {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    @Column(name = "type")
    @Enumerated(EnumType.STRING)
    private EFileType fileType;

    @Column(name = "status")
    @Enumerated(EnumType.STRING)
    private EImageStatus imageStatus;

    @Column(name = "url")
    private String url;
}
