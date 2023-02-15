package com.marketplace.backend.dto.catalog.request;

import lombok.Data;

import javax.validation.constraints.NotNull;

@Data
public class RequestManageAttributeInCatalogDto {
    @NotNull
    private String alias;
    @NotNull
    private String attributeAlias;
}
