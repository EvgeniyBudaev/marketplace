package com.marketplace.backend.dto.catalog.request;


import lombok.Data;

import javax.validation.constraints.NotNull;


@Data
public class RequestUpdateCatalogDto {
    @NotNull
    private Long id;
    private String name;
    private String alias;
    private String image;
}
