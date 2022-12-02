package com.marketplace.backend.dto.response.product;


import lombok.Data;

import java.util.List;

@Data
public class ResponseProductDto {
    private String catalogAlias;
    private Long id;
    private String name;
    private String alias;
    private Boolean enabled;
    private String description;
    private Double rating;
    private String price;
    private List<DoubleValueDto> doubleValues;
    private List<StringValueDto> stringValues;
    private List<IntegerValueDto> integerValues;

    @Data
    public static class DoubleValueDto{
       private String attributeName;
       private Double value;
    }
    @Data
    public static class StringValueDto{
        private String attributeName;
        private String value;
    }
    @Data
    public static class IntegerValueDto{
        private String attributeName;
        private Integer value;
    }

}
