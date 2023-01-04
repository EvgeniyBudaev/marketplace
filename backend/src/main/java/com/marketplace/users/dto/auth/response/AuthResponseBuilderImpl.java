package com.marketplace.users.dto.auth.response;

import com.marketplace.AppProperties;
import com.marketplace.users.utils.JwtTokenUtil;
import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;
import java.util.Date;

public class AuthResponseBuilderImpl implements AuthResponseBuilder{
    private final AuthResponseDto dto;
    private final JwtTokenUtil util;
    private final Date issuedDate;



    public AuthResponseBuilderImpl(JwtTokenUtil util, AppProperties properties) {
        this.util = util;
        this.dto = new AuthResponseDto();
        this.issuedDate = new Date();
        dto.setExpires_in(new Date(issuedDate.getTime() + properties.getJwtLifetime()));
        dto.setRefresh_expires_in(new Date(issuedDate.getTime() + properties.getJwtRefreshLifetime()));
    }

    @Override
    public AuthResponseBuilder generateAccessToken(String email,
                                                   Collection<? extends GrantedAuthority> authorities) {
        dto.setAccess_token(this.util.generateToken(authorities,email
                ,this.issuedDate,this.dto.getExpires_in()));
        return this;
    }

    @Override
    public AuthResponseBuilder setAccessTokenExpire(Date expire) {
        dto.setExpires_in(expire);
        return this;
    }

    @Override
    public AuthResponseBuilder setRefreshToken(String email) {
        dto.setRefresh_token(util.generateRefreshTokenFromEmail(email,dto.getRefresh_expires_in(),issuedDate));
        return this;
    }

    @Override
    public AuthResponseBuilder setRefreshTokenExpire(Date expire) {
        dto.setRefresh_expires_in(expire);
        return this;
    }

    @Override
    public AuthResponseBuilder setTokenType(ETokenType type) {
        dto.setToken_type(type.getType());
        return this;
    }

    @Override
    public AuthResponseDto build() {
        return this.dto;
    }
}
