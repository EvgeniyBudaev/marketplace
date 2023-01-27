package com.marketplace.backend.dto.product.request;


import com.marketplace.backend.model.values.SelectableValue;
import lombok.Data;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.math.BigDecimal;
import java.util.Set;

@Data
public class RequestSaveProductDto {
    private Long id;
    @NotNull
    @Size(min = 5,max = 250)
    private String name;
    @NotNull
    @Size(max = 250)
    private String description;
    @NotNull
    @Size(min = 5,max = 250)
    private String alias;
    @NotNull
    private String catalogAlias;
    @NotNull
    private Integer count;
    @NotNull
    private BigDecimal price;
    @NotNull
    private Set<Long> selectableValues;
    @NotNull
    private Set<NumericValuesDto> numericValues;

       @Data
    public static class NumericValuesDto{
       private Set<NumericValue>  numericValues;
    }
    @Data
    public static class NumericValue{
        private String attributeAlias;
        private Double value;
    }
}
