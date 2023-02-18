package com.marketplace.backend.dto.attributes.request;


import com.marketplace.backend.dto.attributes.response.SelectableValueDto;
import com.marketplace.backend.model.EAttributeType;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.Objects;
import java.util.Set;

@Getter
@Setter
public class RequestSaveAttributeDto {
    @NotNull
    @Size(min = 3,max = 50)
    private String name;
    @NotNull
    @Size(min = 3,max = 50)
    private String alias;
    @NotNull
    private EAttributeType type;
    private Boolean filter;
    private Set<SelectableValueDto> selectable;

    public void setSelectable(Set<SelectableValueDto> selectable) {
        this.selectable = selectable;
    }

    public Set<SelectableValueDto> getSelectable() {
        return selectable;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        RequestSaveAttributeDto that = (RequestSaveAttributeDto) o;
        return Objects.equals(name, that.name) && Objects.equals(alias, that.alias) && type == that.type && Objects.equals(filter, that.filter) && Objects.equals(selectable, that.selectable);
    }

    @Override
    public int hashCode() {
        return Objects.hash(name, alias, type, filter, selectable);
    }

    @Override
    public String toString() {
        return "RequestSaveOrUpdateAttribute{" +
                ", name='" + name + '\'' +
                ", alias='" + alias + '\'' +
                ", type=" + type +
                ", filter=" + filter +
                ", selectable=" + selectable.toString() +
                '}';
    }
}
