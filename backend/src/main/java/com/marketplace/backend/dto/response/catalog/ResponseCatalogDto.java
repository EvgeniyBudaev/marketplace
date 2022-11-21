package com.marketplace.backend.dto.response.catalog;

import lombok.Data;


@Data
public class ResponseCatalogDto {
    private Long id;
    private String name;
    private String alias;
    private String image;
    private boolean enabled;
}
