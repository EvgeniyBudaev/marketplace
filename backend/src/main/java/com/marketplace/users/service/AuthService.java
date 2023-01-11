package com.marketplace.users.service;

import com.marketplace.backend.exception.AppError;
import com.marketplace.properties.AppProperties;
import com.marketplace.users.dto.auth.request.AuthRequestDto;
import com.marketplace.users.dto.auth.response.AuthResponseBuilder;
import com.marketplace.users.dto.auth.response.AuthResponseBuilderImpl;
import com.marketplace.users.dto.auth.response.AuthResponseDto;
import com.marketplace.users.dto.auth.response.ETokenType;
import com.marketplace.users.model.AppUser;
import com.marketplace.users.utils.JwtTokenUtil;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;



@Service
public class AuthService {
    private final JwtTokenUtil jwtTokenUtil;
    private final AuthenticationManager authenticationManager;
    private final AppUserDetailsService userDetailsService;
    private final RefreshTokenService refreshTokenService;
    private final AppProperties properties;

    public AuthService(JwtTokenUtil jwtTokenUtil, AuthenticationManager authenticationManager, AppUserDetailsService userDetailsService, RefreshTokenService refreshTokenService, AppProperties properties) {
        this.jwtTokenUtil = jwtTokenUtil;
        this.authenticationManager = authenticationManager;
        this.userDetailsService = userDetailsService;
        this.refreshTokenService = refreshTokenService;
        this.properties = properties;
    }

    public ResponseEntity<?> authentication(AuthRequestDto dto){
        String emailOrPhone = null;
        if(dto.getEmail()!=null){
            emailOrPhone= dto.getEmail();
        } else if (dto.getPhone()!=null) {
            emailOrPhone = dto.getPhone();
        }
        if(emailOrPhone==null){
           throw  new BadCredentialsException("Не заполнено почта или номер телефона");
        }
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(emailOrPhone, dto.getPassword()));
        AuthResponseBuilder builder = new AuthResponseBuilderImpl(jwtTokenUtil,properties);
        builder.generateAccessToken(authentication.getName(),authentication.getAuthorities())
               .setRefreshToken(authentication.getName())
               .setTokenType(ETokenType.BEARER);
        AuthResponseDto responseDto = builder.build();
        refreshTokenService.updateToken(authentication.getName(),responseDto.getRefresh_token());
        return new ResponseEntity<>(responseDto, HttpStatus.OK);
    }

    public ResponseEntity<?> updateToken(String refreshToken) {
        String email;
        /* Если токен истек то будет выкинут ExpiredJwtException*/
        try {
            email = jwtTokenUtil.getEmailFromToken(refreshToken);
        }catch (ExpiredJwtException e){
            return new ResponseEntity<>(new AppError(HttpStatus.UNAUTHORIZED.name(), "RefreshToken Expired"), HttpStatus.UNAUTHORIZED);
        }catch (MalformedJwtException e){
            return new ResponseEntity<>(new AppError(HttpStatus.UNAUTHORIZED.name(), "RefreshToken not valid"), HttpStatus.UNAUTHORIZED);
        }
        AppUser user = userDetailsService.findUserWithRolesByEmail(email);
        AuthResponseBuilder builder = new AuthResponseBuilderImpl(jwtTokenUtil,properties);
        builder.generateAccessToken(email,user.getAuthorities())
                .setRefreshToken(user.getEmail())
                .setTokenType(ETokenType.BEARER);
        AuthResponseDto responseDto = builder.build();
        refreshTokenService.updateToken(user.getEmail(),responseDto.getRefresh_token());
        return new ResponseEntity<>(responseDto, HttpStatus.OK);
    }
}
