package com.marketplace.backend.dto.request.product;


import lombok.Data;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Data
public class RequestSaveProductDto {
    private Long id;
    @NotNull
    @Size(min = 5,max = 250)
    private String name;
    @NotNull
    @Size(min = 5,max = 250)
    private String alias;
    @NotNull
    private Boolean enabled;
    @NotNull
    private Long catalogId;
}
