package com.marketplace.backend.dto.attributes.request;

import com.marketplace.backend.dto.attributes.BaseAttributeDto;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
@Getter
@Setter
public class RequestSaveSelectableAttribute extends BaseAttributeDto {
    private List<SelectableValueDto> selectable;

    @Getter
    @Setter
    public static class SelectableValueDto{
        private Long id;
        private String value;
    }
}
