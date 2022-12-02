package com.marketplace.backend.dto.response.catalog;

import lombok.Data;

import java.util.List;


@Data
public class ResponseCatalogDto {
    private Long id;
    private String name;
    private String alias;
    private String image;
    private boolean enabled;
    private List<AttributeDto> attribute;

    @Data
    public static class AttributeDto{
        private Long id;
        private String title;
        private String type;

    }
}
