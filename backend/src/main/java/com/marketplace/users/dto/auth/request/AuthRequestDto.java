package com.marketplace.users.dto.auth.request;

import lombok.Data;

@Data
public class AuthRequestDto {
    private String email;
    private String phone;
    private String password;
}
