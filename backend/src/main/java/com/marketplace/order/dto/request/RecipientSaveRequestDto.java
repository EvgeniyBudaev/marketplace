package com.marketplace.order.dto.request;


import lombok.Data;


@Data
public class RecipientSaveRequestDto {
    private String uuid;
    private String name;
    private String surname;
    private String phone;
    private String email;
}
