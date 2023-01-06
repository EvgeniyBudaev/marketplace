package com.marketplace.properties.model.convertes;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TokenProperty {
    private VerificationTokenProperty verificationTokenProperty;
    private JwtTokenProperty jwtTokenProperty;

    public TokenProperty() {
        this.verificationTokenProperty = new VerificationTokenProperty();
        this.jwtTokenProperty = new JwtTokenProperty();
    }

    @Getter
    @Setter
    public static class VerificationTokenProperty{
        private long period =24*60*60*1000L;/*Жизнь токена в наносекундах*/
    }
    @Getter
    @Setter
    public static  class JwtTokenProperty{
       private String secret;
    }
}
