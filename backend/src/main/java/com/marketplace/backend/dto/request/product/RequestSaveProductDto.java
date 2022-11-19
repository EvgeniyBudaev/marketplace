package com.marketplace.backend.dto.request.product;


import lombok.Data;

@Data
public class RequestSaveProductDto {
    private Long id;
    private String name;
    private String alias;
    private Boolean enabled;
    private Long catalogId;
}
