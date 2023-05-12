package com.marketplace.backend.dto.product.request;



import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

public class RequestSaveWithImageProductDto implements RequestSaveOrUpdate {
    @Getter
    @Setter
    private Long id;
    @Getter
    @Setter
    @NotNull
    @Size(min = 5, max = 250)
    private String name;
    @Getter
    @Setter
    @NotNull
    @Size(max = 250)
    private String description;
    @Getter
    @Setter
    @NotNull
    @Size(min = 5, max = 250)
    private String alias;
    @NotNull
    @Getter
    @Setter
    private String catalogAlias;
    @Getter
    @Setter
    private Integer count;
    @Getter
    @Setter
    @NotNull
    private BigDecimal price;
    @Setter
    private List<Long> selectableValues=new ArrayList<>();
    @Setter
    @Getter
    private List<NumericValue> numericValues = new ArrayList<>();
    @Setter
    @Getter
    private String defaultImage;/*default image filename*/

    public Set<Long> getSelectableValues(){
        return new HashSet<>(this.selectableValues);
    }

    @Override
    public List<String> getImages() {
        return null;
    }
}
