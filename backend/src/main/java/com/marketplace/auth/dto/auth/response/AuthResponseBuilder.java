package com.marketplace.auth.dto.auth.response;

import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;
import java.util.Date;

public interface AuthResponseBuilder {
    AuthResponseBuilder generateAccessToken(String email,
                                            Collection<? extends GrantedAuthority> authorities);
    AuthResponseBuilder setAccessTokenExpire(Date expire);
    AuthResponseBuilder setRefreshToken(String email);
    AuthResponseBuilder setRefreshTokenExpire(Date expire);
    AuthResponseBuilder setTokenType(ETokenType type);
    AuthResponseDto build();
}
