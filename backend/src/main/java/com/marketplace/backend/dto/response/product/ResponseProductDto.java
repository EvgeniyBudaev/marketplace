package com.marketplace.backend.dto.response.product;


import lombok.Data;

import java.util.ArrayList;
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
    private String count;
    private List<AttributeValueDto> attributes = new ArrayList<>();

    @Data
    public static class AttributeValueDto{
       private String attributeName;
       private String value;
    }


}
