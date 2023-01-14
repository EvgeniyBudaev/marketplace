package com.marketplace.users.dto.auth.response;

import lombok.Data;

import java.util.Date;

@Data
public class AuthResponseDto {
    private String access_token;
    private String refresh_token;
    private Date expires_in;
    private Date refresh_expires_in;
    private String token_type;
    private String uuid;

    protected AuthResponseDto(){}
}
