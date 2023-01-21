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

    public static Builder builder(){
        return new Builder();
    }

    public AuthResponseDto(){}
    public static class Builder{
        private final AuthResponseDto dto;
        public Builder(){
            this.dto = new AuthResponseDto();
        }
        public Builder setAccessToken(String accessToken){
            dto.setAccess_token(accessToken);
            return this;
        }
        public Builder setExpireIn(Date expireIn){
            dto.setExpires_in(expireIn);
            return this;
        }
        public Builder setRefreshToken(String refreshToken){
            dto.setRefresh_token(refreshToken);
            return this;
        }
        public Builder setRefreshExpireIn(Date refreshExpireIn){
            dto.setRefresh_expires_in(refreshExpireIn);
            return this;
        }
        public Builder setUuid(String uuid){
            dto.setUuid(uuid);
            return this;
        }
        public  Builder setTokenType(ETokenType type){
            dto.setToken_type(type.getType());
            return this;
        }

        public AuthResponseDto build(){
            if (dto.getToken_type()==null){
                dto.setToken_type(ETokenType.BEARER.getType());
            }
            return this.dto;
        }
    }
}
