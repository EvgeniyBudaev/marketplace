package com.marketplace.users.dto.auth.request;

import lombok.Data;

import javax.validation.constraints.NotNull;

@Data
public class RefreshTokenUpdateRequestDto {
    @NotNull
    private String refreshToken;
}
