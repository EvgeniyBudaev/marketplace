package com.marketplace.backend.dto.response.product;


import lombok.Data;

@Data
public class ResponseProductDto {
    private Long id;
    private String name;
    private String alias;
    private Boolean enabled;
    private Long catalogId;
}
