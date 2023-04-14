package com.marketplace.backend.dto.product.request;


import lombok.Data;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.math.BigDecimal;
import java.util.HashSet;
import java.util.Set;


@Data
public class RequestSaveProductDto implements RequestSaveOrUpdate {
    private Long id;
    @NotNull
    @Size(min = 5, max = 250)
    private String name;
    @NotNull
    @Size(max = 250)
    private String description;
    @NotNull
    @Size(min = 5, max = 250)
    private String alias;
    @NotNull
    private String catalogAlias;
    private Integer count;
    @NotNull
    private BigDecimal price;
    private Set<Long> selectableValues = new HashSet<>();
    private Set<NumericValue> numericValues = new HashSet<>();

}
