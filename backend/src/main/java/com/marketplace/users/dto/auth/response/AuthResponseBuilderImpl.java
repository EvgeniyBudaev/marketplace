package com.marketplace.users.dto.auth.response;

import com.marketplace.properties.AppProperties;
import com.marketplace.properties.model.EPropertiesType;
import com.marketplace.properties.model.properties.JwtProperties;
import com.marketplace.users.model.SessionId;
import com.marketplace.users.utils.JwtTokenUtil;
import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;
import java.util.Date;

public class AuthResponseBuilderImpl implements AuthResponseBuilder{
    private final AuthResponseDto dto;
    private final JwtTokenUtil util;
    private final Date issuedDate;



    public AuthResponseBuilderImpl(JwtTokenUtil util, AppProperties properties) {
        JwtProperties prop = (JwtProperties) properties.getProperty(EPropertiesType.JWT);
        this.util = util;
        this.dto = new AuthResponseDto();
        this.issuedDate = new Date();
        dto.setExpires_in(new Date(issuedDate.getTime() + prop.getJwtLifetime()));
        dto.setRefresh_expires_in(new Date(issuedDate.getTime() + prop.getJwtRefreshLifetime()));
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
    public AuthResponseBuilder setSession(SessionId sessionId) {
        dto.setUuid(sessionId.getUuid());
        return this;
    }

    @Override
    public AuthResponseDto build() {
        return this.dto;
    }
}
