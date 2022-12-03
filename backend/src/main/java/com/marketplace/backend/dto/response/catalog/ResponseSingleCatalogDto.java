package com.marketplace.backend.dto.response.catalog;

import lombok.Data;
import java.util.List;
import java.util.Set;


@Data
public class ResponseSingleCatalogDto {
    private Long id;
    private String name;
    private String alias;
    private String image;
    private boolean enabled;
    private List<SelectAttributeDto> selectAttribute;
    private List<NumberAttributeDto> numberAttribute;
    @Data
    public static class SelectAttributeDto {
        private Long id;
        private String name;
        private String alias;
        private Set<String> values;
    }
    @Data
    public static class NumberAttributeDto{
        private Long id;
        private String name;
        private String alias;
        private Double min;
        private Double max;
    }
}
