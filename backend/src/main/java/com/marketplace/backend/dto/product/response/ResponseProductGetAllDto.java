package com.marketplace.backend.dto.product.response;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ResponseProductGetAllDto {
    private Long id;
    private String name;
    private String alias;
    private LocalDateTime modifyDate;
    private LocalDateTime createdAt;
}
