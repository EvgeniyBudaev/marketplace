package com.marketplace.backend.dto.attributes.request;


import com.marketplace.backend.dto.attributes.response.SelectableValueDto;
import com.marketplace.backend.model.EAttributeType;
import lombok.Getter;
import lombok.Setter;
import org.apache.commons.lang3.builder.EqualsBuilder;
import org.apache.commons.lang3.builder.HashCodeBuilder;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.List;
@Getter
@Setter
public class RequestSaveOrUpdateAttribute {
    private Long id;
    @NotNull
    @Size(min = 3,max = 50)
    private String name;
    @NotNull
    @Size(min = 3,max = 50)
    private String alias;
    @NotNull
    private EAttributeType type;
    private Boolean filter;
    private List<SelectableValueDto> selectable;

    public void setSelectable(List<SelectableValueDto> selectable) {
        this.selectable = selectable;
    }

    public List<SelectableValueDto> getSelectable() {
        return selectable;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;

        if (o == null || getClass() != o.getClass()) return false;

        RequestSaveOrUpdateAttribute that = (RequestSaveOrUpdateAttribute) o;

        return new EqualsBuilder().append(id, that.id).append(name, that.name).append(alias, that.alias).append(type, that.type).append(filter, that.filter).append(selectable, that.selectable).isEquals();
    }

    @Override
    public int hashCode() {
        return new HashCodeBuilder(17, 37).append(id).append(name).append(alias).append(type).append(filter).append(selectable).toHashCode();
    }

    @Override
    public String toString() {
        return "RequestSaveOrUpdateAttribute{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", alias='" + alias + '\'' +
                ", type=" + type +
                ", filter=" + filter +
                ", selectable=" + selectable.toString() +
                '}';
    }
}
