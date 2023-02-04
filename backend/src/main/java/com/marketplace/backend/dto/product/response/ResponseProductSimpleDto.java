package com.marketplace.backend.dto.product.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class ResponseProductSimpleDto {
    private String name;
    private String alias;
}
