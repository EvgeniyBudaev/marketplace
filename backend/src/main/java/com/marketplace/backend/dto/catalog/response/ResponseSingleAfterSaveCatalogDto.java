package com.marketplace.backend.dto.catalog.response;


import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.Set;

@Data
public class ResponseSingleAfterSaveCatalogDto {
    private Long id;
    private String name;
    private String alias;
    private String image;
    private boolean enabled;
    private LocalDateTime createdAt;
    private LocalDateTime modifyDate;
    private Set<SelectAttributeDto> selectAttribute;
    private Set<NumberAttributeDto> numberAttribute;

    @Data
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

    @Data
    @AllArgsConstructor
    public static class NumberAttributeDto {
        private Long id;
        private String name;
        private String alias;
    }
}