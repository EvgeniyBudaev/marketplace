package com.marketplace.backend.dto.attributes.request;


import com.marketplace.backend.model.EAttributeType;
import lombok.Data;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.List;

@Data
public class RequestPutAttributeDto {
    @NotNull
    private Long id;
    @NotNull
    @Size(min = 3, max = 50)
    private String name;
    @NotNull
    @Size(min = 3, max = 50)
    private String alias;
    @NotNull
    private EAttributeType type;
    @NotNull
    private Boolean filter;
    private List<SelectableValueDto> selectable;

    @Data
    public static class SelectableValueDto {
        @NotNull
        private Long id;
        @NotNull
        @Size(min = 3, max = 50)
        private String value;
    }

}
