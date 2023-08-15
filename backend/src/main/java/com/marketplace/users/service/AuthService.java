package com.marketplace.users.service;


import com.marketplace.properties.AppProperties;
import com.marketplace.properties.model.EPropertiesType;
import com.marketplace.properties.model.properties.JwtProperties;
import com.marketplace.users.dto.auth.request.AuthRequestDto;
import com.marketplace.users.dto.auth.response.AuthResponseDto;
import com.marketplace.users.model.AppUser;
import com.marketplace.users.utils.JwtTokenUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Service;

import java.util.Date;



@Service
public class AuthService {

    private final AuthenticationManager authenticationManager;
    private final AppUserDetailsService userDetailsService;
    private final RefreshTokenService refreshTokenService;
    private final AppProperties properties;
    private final JwtTokenUtil jwtUtil;


    @Autowired
    public AuthService(AuthenticationManager authenticationManager, AppUserDetailsService userDetailsService, RefreshTokenService refreshTokenService, AppProperties properties, JwtTokenUtil jwtUtil) {
        this.authenticationManager = authenticationManager;
        this.userDetailsService = userDetailsService;
        this.refreshTokenService = refreshTokenService;
        this.properties = properties;
        this.jwtUtil = jwtUtil;
    }

    public AppUser authentication(AuthRequestDto dto) {
        String emailOrPhone = null;
        if (dto.getEmail() != null) {
            emailOrPhone = dto.getEmail();
        } else if (dto.getPhone() != null) {
            emailOrPhone = dto.getPhone();
        }
        if (emailOrPhone == null) {
            throw new BadCredentialsException("Не заполнено почта или номер телефона");
        }
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(emailOrPhone, dto.getPassword()));
        return userDetailsService.findUserWithRolesByEmail(authentication.getName());
    }

    public AppUser findUserByRefresh(String refreshToken) {
        return refreshTokenService.getUserByRefreshToken(refreshToken);
    }

    public void saveRefreshToken(AppUser user, String token) {
        refreshTokenService.updateToken(user.getEmail(), token);
    }
    public AuthResponseDto getAuthResponseDto(AppUser user) {
        JwtProperties prop = (JwtProperties) properties.getProperty(EPropertiesType.JWT);
        Date issuedDate = new Date();
        Date accessExpires = new Date(issuedDate.getTime() + prop.getJwtLifetime());
        Date refreshExpire = new Date(issuedDate.getTime() + prop.getJwtRefreshLifetime());
        String accessToken = jwtUtil.generateToken(user.getAuthorities(), user.getEmail(), issuedDate, accessExpires);
        String refreshToken = jwtUtil.generateRefreshTokenFromEmail(user.getEmail(), refreshExpire, issuedDate);
        saveRefreshToken(user, refreshToken);
        return AuthResponseDto
                .builder()
                .setAccessToken(accessToken)
                .setRefreshToken(refreshToken)
                .setExpireIn(accessExpires)
                .setRefreshExpireIn(refreshExpire)
                .setUuid(user.getSessionId().getUuid())
                .setPermissions(user.getAuthorities().stream().map(GrantedAuthority::getAuthority).toList())
                .build();
    }
}
