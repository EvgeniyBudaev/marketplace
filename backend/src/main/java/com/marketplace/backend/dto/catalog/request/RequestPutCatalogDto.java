package com.marketplace.backend.dto.catalog.request;


import lombok.Data;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.List;


@Data
public class RequestPutCatalogDto {
    @NotNull
    private Long id;
    @NotNull
    @Size(min = 2, max = 250)
    private String name;
    @NotNull
    @Size(min = 2, max = 250)
    private String alias;
    @Size(max = 250)
    private String image;
    private List<String> attributeAlias;
}
