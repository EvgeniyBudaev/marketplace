package com.marketplace.backend.dto.request.catalog;

import lombok.Data;

@Data
public class RequestSaveCatalogDto {
    private Long id;
    private String name;
    private String alias;
    private String image;
    private boolean enabled;
}
