package com.marketplace.backend.dto.product.response;

import com.marketplace.backend.model.EAttributeType;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.Set;

@Data
public class ResponseProductDtoForAdmin {
    private Long id;
    private String name;
    private String alias;
    private String catalogAlias;
    private Boolean enabled;
    private String description;
    private Double rating;
    private String price;
    private String count;
    private LocalDateTime createdAt;
    private LocalDateTime modifyDate;
    private Set<AttributeValueDto> attributeValuesSet;

    @Data
    public static class AttributeValueDto {
        private Long id;
        private EAttributeType attributeType;
        private String attributeName;
        private String attributeAlias;
        private String value;
    }

}
