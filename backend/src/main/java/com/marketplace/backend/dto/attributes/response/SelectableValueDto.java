package com.marketplace.backend.dto.attributes.response;


import lombok.Getter;
import lombok.Setter;
import org.apache.commons.lang3.builder.EqualsBuilder;
import org.apache.commons.lang3.builder.HashCodeBuilder;

@Getter
@Setter
public class SelectableValueDto {
    private Long id;
    private Long attributeId;
    private String value;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;

        if (o == null || getClass() != o.getClass()) return false;

        SelectableValueDto that = (SelectableValueDto) o;

        return new EqualsBuilder().append(id, that.id).append(attributeId, that.attributeId).append(value, that.value).isEquals();
    }

    @Override
    public int hashCode() {
        return new HashCodeBuilder(17, 37).append(id).append(attributeId).append(value).toHashCode();
    }

    @Override
    public String toString() {
        return "SelectableValueDto{" +
                "id=" + id +
                ", attributeId=" + attributeId +
                ", value='" + value + '\'' +
                '}';
    }
}

