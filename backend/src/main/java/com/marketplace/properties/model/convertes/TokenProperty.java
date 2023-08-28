package com.marketplace.properties.model.convertes;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TokenProperty {
    private CredentialVerifyTokenProperty credentialVerifyTokenProperty;
    private JwtTokenProperty jwtTokenProperty;

    public TokenProperty() {
        this.credentialVerifyTokenProperty = new CredentialVerifyTokenProperty();
        this.jwtTokenProperty = new JwtTokenProperty();
    }

    @Getter
    @Setter
    public static class CredentialVerifyTokenProperty {
        private long period = 24 * 60 * 60 * 1_000_000_000L;/*Жизнь токена в наносекундах*/
    }

    @Getter
    @Setter
    public static class JwtTokenProperty {
        private String secret;
    }
}
