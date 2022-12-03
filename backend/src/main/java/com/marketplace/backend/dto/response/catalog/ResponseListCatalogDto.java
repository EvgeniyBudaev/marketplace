package com.marketplace.backend.dto.response.catalog;

import lombok.Data;
@Data
public class ResponseListCatalogDto {
    private Long id;
    private String name;
    private String alias;
    private String image;
}
