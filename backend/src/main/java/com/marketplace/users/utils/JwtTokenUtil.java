package com.marketplace.users.utils;


import com.marketplace.properties.AppProperties;
import com.marketplace.properties.events.JwtPropertiesChangeEvent;
import com.marketplace.properties.model.EPropertiesType;
import com.marketplace.properties.model.properties.JwtProperties;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.context.ApplicationListener;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Component;

import java.util.*;
import java.util.function.Function;
import java.util.stream.Collectors;


@Component
public class JwtTokenUtil implements InitializingBean, ApplicationListener<JwtPropertiesChangeEvent> {
    private final AppProperties properties;
    private JwtProperties jwtProperties;


    public JwtTokenUtil(AppProperties properties) {
        this.properties = properties;
    }

    public String generateToken(
            Collection<? extends GrantedAuthority> authorities, String email, Date issuedDate, Date expiredDate) {
        Map<String, Object> claims = new HashMap<>();
        List<String> rolesList = authorities.stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toList());
        claims.put("roles", rolesList);
        return
        Jwts.builder()
                .setClaims(claims)
                .setSubject(email)
                .setIssuedAt(issuedDate)
                .setExpiration(expiredDate)
                .signWith(SignatureAlgorithm.HS256, getSecret())
                .compact();
    }

    public String getEmailFromToken(String token) {
        return getClaimFromToken(token, Claims::getSubject);
    }

    public List<String> getRoles(String token) {
        return getClaimFromToken(token, (Function<Claims, List<String>>) claims -> claims.get("roles", List.class));
    }
    public String generateRefreshTokenFromEmail(String email,Date expires,Date issuedDate) {
        return Jwts.builder()
                .setSubject(email)
                .setIssuedAt(issuedDate)
                .setExpiration(expires).signWith(SignatureAlgorithm.HS256, getSecret())
                .compact();
    }

    private <T> T getClaimFromToken(String token, Function<Claims, T> claimsResolver) {
        Claims claims = getAllClaimsFromToken(token);
        return claimsResolver.apply(claims);
    }

    private Claims getAllClaimsFromToken(String token) {
        return Jwts.parser()
                .setSigningKey(getSecret())
                .parseClaimsJws(token)
                .getBody();
    }


    @Override
    public void afterPropertiesSet()  {
        this.jwtProperties = (JwtProperties) this.properties.getProperty(EPropertiesType.JWT);
    }

    private String getSecret(){
       return this.jwtProperties.getSecret();
    }

    @Override
    public void onApplicationEvent(JwtPropertiesChangeEvent event) {
        this.jwtProperties = (JwtProperties) this.properties.getProperty(EPropertiesType.JWT);
    }
}
