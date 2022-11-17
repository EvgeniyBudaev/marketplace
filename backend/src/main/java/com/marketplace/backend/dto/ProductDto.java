package com.marketplace.backend.dto;

import lombok.Data;

@Data
public class ProductDto {
    private Long id;
    private String name;
    private String alias;
    private boolean enabled;
    private Long catalogId;
}
