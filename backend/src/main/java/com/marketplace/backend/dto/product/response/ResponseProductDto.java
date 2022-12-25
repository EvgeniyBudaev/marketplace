package com.marketplace.backend.dto.product.response;


import lombok.Data;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

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
    private LocalDateTime createdAt;
    private Set<AttributeValueDto> attributes = new HashSet<>();

    @Data
    public static class AttributeValueDto{
       private String attributeName;
       private String value;
    }


}
