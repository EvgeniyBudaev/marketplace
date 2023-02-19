package com.marketplace.backend.dto.attributes.response;

import com.marketplace.backend.model.EAttributeType;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;


@Getter
@Setter
public class ResponseAttributeForGetAll {
    private Long id;
    private String name;
    private String alias;
    private EAttributeType type;
    private Boolean filter;
    private LocalDateTime createdAt;
    private LocalDateTime modifyDate;
}
