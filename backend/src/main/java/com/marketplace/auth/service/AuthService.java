package com.marketplace.auth.service;

import com.marketplace.auth.dto.auth.request.AuthRequestDto;
import com.marketplace.auth.utils.JwtTokenUtil;
import com.marketplace.backend.exception.AppError;
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

    public AuthService(JwtTokenUtil jwtTokenUtil, AuthenticationManager authenticationManager) {
        this.jwtTokenUtil = jwtTokenUtil;
        this.authenticationManager = authenticationManager;
    }

    public ResponseEntity<?> authentication(AuthRequestDto dto){
        Authentication authentication;
        String emailOrPhone = null;
        if(dto.getEmail()!=null){
            emailOrPhone= dto.getEmail();
        } else if (dto.getPhone()!=null) {
            emailOrPhone = dto.getPhone();
        }
        if(emailOrPhone==null){
            return new ResponseEntity<>(new AppError(HttpStatus.UNAUTHORIZED.name(), "Не заполнено почта или номер телефона"), HttpStatus.UNAUTHORIZED);
        }
        try {
            authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(emailOrPhone, dto.getPassword()));
        } catch (BadCredentialsException e) {
            return new ResponseEntity<>(new AppError(HttpStatus.UNAUTHORIZED.name(), "Неправильные почта или пароль"), HttpStatus.UNAUTHORIZED);
        }
        return new ResponseEntity<>(jwtTokenUtil.generateToken(authentication), HttpStatus.OK);
    }
}
