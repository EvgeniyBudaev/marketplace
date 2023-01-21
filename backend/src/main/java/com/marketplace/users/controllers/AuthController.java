package com.marketplace.users.controllers;

import com.marketplace.properties.AppProperties;
import com.marketplace.properties.model.EPropertiesType;
import com.marketplace.properties.model.properties.JwtProperties;
import com.marketplace.users.dto.auth.request.AuthRequestDto;
import com.marketplace.users.dto.auth.request.RefreshTokenUpdateRequestDto;
import com.marketplace.users.dto.auth.response.AuthResponseDto;
import com.marketplace.users.model.AppUser;
import com.marketplace.users.service.AuthService;
import com.marketplace.users.utils.JwtTokenUtil;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.util.Date;


@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {
    private final AuthService authService;
    private final AppProperties properties;
    private final JwtTokenUtil jwtUtil;

    public AuthController(AuthService authService, AppProperties properties, JwtTokenUtil jwtUtil) {
        this.authService = authService;
        this.properties = properties;
        this.jwtUtil = jwtUtil;
    }


    /*Почта pum@mail.ru Пароль 123456 Тел: +79219516997*/
    @PostMapping
    public AuthResponseDto  authentication(@RequestBody AuthRequestDto authRequest){
        AppUser user = authService.authentication(authRequest);
        return getAuthResponseDto(user);
    }
    @PostMapping("/refresh")
    public AuthResponseDto refreshToken(@RequestBody @Valid RefreshTokenUpdateRequestDto dto){
        AppUser user = authService.findUserByRefresh(dto.getRefreshToken());
        return getAuthResponseDto(user);
    }

    public AuthResponseDto getAuthResponseDto(AppUser user) {
        JwtProperties prop = (JwtProperties) properties.getProperty(EPropertiesType.JWT);
        Date issuedDate = new Date();
        Date accessExpires = new Date(issuedDate.getTime() + prop.getJwtLifetime());
        Date refreshExpire = new Date(issuedDate.getTime()+prop.getJwtRefreshLifetime());
        String accessToken = jwtUtil.generateToken(user.getAuthorities(), user.getEmail(), issuedDate,accessExpires);
        String refreshToken = jwtUtil.generateRefreshTokenFromEmail(user.getEmail(),refreshExpire,issuedDate);
        authService.saveRefreshToken(user,refreshToken);
        return AuthResponseDto
                .builder()
                .setAccessToken(accessToken)
                .setRefreshToken(refreshToken)
                .setExpireIn(accessExpires)
                .setRefreshExpireIn(refreshExpire)
                .setUuid(user.getSessionId().getUuid())
                .build();
    }
}
