package com.marketplace.auth.dto.auth.response;

import lombok.Data;

import java.util.Date;

@Data
public class AuthResponseDto {
    private String access_token;
    private String refresh_token;
    private Date expires_in;
    private String token_type = "Bearer";
}
