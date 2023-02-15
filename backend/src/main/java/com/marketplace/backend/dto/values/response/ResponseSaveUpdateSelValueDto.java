package com.marketplace.backend.dto.values.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ResponseSaveUpdateSelValueDto {
    private Long id;
    private String value;
    private Long attributeId;
}
