package com.marketplace.backend.dto.catalog.response;


import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ResponseSimpleCatalogDto {
    private Long id;
    private String name;
    private String alias;
    private String image;
    private LocalDateTime createdAt;
    private LocalDateTime modifyDate;
}
