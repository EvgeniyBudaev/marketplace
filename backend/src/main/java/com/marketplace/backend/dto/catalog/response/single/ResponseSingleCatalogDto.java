package com.marketplace.backend.dto.catalog.response.single;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.apache.commons.lang3.builder.EqualsBuilder;
import org.apache.commons.lang3.builder.HashCodeBuilder;

import java.util.Objects;
import java.util.Set;


@Data
@NoArgsConstructor
public class ResponseSingleCatalogDto {
    private Long id;
    private String name;
    private String alias;
    private String image;
    private boolean enabled;
    private Set<SelectAttributeDto> selectAttribute;
    private Set<NumberAttributeDto> numberAttribute;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ResponseSingleCatalogDto that = (ResponseSingleCatalogDto) o;
        return id.equals(that.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
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

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;
            SelectValueDto that = (SelectValueDto) o;
            return new EqualsBuilder().append(id, that.id).isEquals();
        }

        @Override
        public int hashCode() {
            return new HashCodeBuilder(17, 37).append(id).toHashCode();
        }

    }
}
