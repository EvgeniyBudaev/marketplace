package com.marketplace.backend.dto.catalog.response;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Data
public class ResponseAttributeByCatalogAlias {
    private String alias;
    private Set<SelectAttributeDto> selectableAttribute;
    private Set<NumberAttributeDto> numberAttribute;

    @Data
    public static class NumberAttributeDto {
        private Long id;
        private String name;
        private String attributeAlias;
    }
    @Data
    @NoArgsConstructor
    public static class SelectAttributeDto {
        private Long id;
        private String name;
        private String alias;
        private Set<SelectValueDto> values;
    }

    @Data
    @AllArgsConstructor
    public static class SelectValueDto {
        private Long id;
        private String value;
    }
}
