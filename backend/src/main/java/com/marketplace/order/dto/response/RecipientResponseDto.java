package com.marketplace.order.dto.response;

import lombok.Data;

import java.time.LocalDateTime;
@Data
public class RecipientResponseDto {
    private String session;
    private String name;
    private String surname;
    private String phone;
    private String email;
    private LocalDateTime modifyDate;
}
