package com.marketplace.properties.model.properties;

import com.marketplace.properties.model.EPropertiesType;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class JwtProperties implements PropertiesType{
    private String secret;
    private Integer jwtLifetime;
    private Integer jwtRefreshLifetime;

    @Override
    public EPropertiesType getPropertiesType() {
        return EPropertiesType.JWT;
    }
}
