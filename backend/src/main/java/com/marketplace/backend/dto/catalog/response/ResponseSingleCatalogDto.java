package com.marketplace.backend.dto.catalog.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.apache.commons.lang3.builder.EqualsBuilder;
import org.apache.commons.lang3.builder.HashCodeBuilder;

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
        private Set<SelectValue> values;
    }
    @Data
    public static class NumberAttributeDto{
        private Long id;
        private String name;
        private String alias;
        private Double min;
        private Double max;
    }
    @Data
    @AllArgsConstructor
    public static class SelectValue{
        private Long id;
        private String value;


        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;
            SelectValue that = (SelectValue) o;
            return new EqualsBuilder().append(id, that.id).isEquals();
        }

        @Override
        public int hashCode() {
            return new HashCodeBuilder(17, 37).append(id).toHashCode();
        }
    }

}
