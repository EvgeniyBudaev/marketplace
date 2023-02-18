package com.marketplace.backend.dto.attributes.request;

import com.marketplace.backend.model.EAttributeType;
import lombok.Data;

import javax.validation.constraints.NotNull;
import java.util.Objects;

@Data
public class RequestPatchAttributeDto {
    @NotNull
    private Long id;
    private String name;
    private String alias;
    private EAttributeType type;
    private Boolean filter;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        RequestPatchAttributeDto that = (RequestPatchAttributeDto) o;
        return Objects.equals(id, that.id) && Objects.equals(name, that.name) && Objects.equals(alias, that.alias) && type == that.type && Objects.equals(filter, that.filter);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, alias, type, filter);
    }
}
