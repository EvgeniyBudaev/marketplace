package com.marketplace.backend.dto.product.request;


import lombok.Data;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Data
public class RequestUpdateWithImageProductDto implements RequestSaveOrUpdate {
    @NotNull
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
    private List<Long> selectableValues = new ArrayList<>();
    private List<NumericValue> numericValues = new ArrayList<>();
    private List<String> images =new ArrayList<>();


    public Set<Long> getSelectableValues(){
        return new HashSet<>(this.selectableValues);
    }

    @Override
    public String getDefaultImage() {
        return null;
    }
}
