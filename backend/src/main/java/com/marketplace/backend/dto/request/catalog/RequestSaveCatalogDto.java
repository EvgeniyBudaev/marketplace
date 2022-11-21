package com.marketplace.backend.dto.request.catalog;

import lombok.Data;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Data
public class RequestSaveCatalogDto {
    private Long id;
    @NotNull
    @Size(min = 5,max = 250)
    private String name;
    @NotNull
    @Size(min = 5,max = 250)
    private String alias;
    @NotNull
    @Size(min = 5,max = 250)
    private String image;
    @NotNull
    private boolean enabled;
}
