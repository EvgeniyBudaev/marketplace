package com.marketplace.auth.controllers;

import com.marketplace.auth.dto.auth.request.AuthRequestDto;
import com.marketplace.auth.dto.auth.response.AuthResponse;
import com.marketplace.auth.service.AppUserDetailsService;
import com.marketplace.auth.utils.JwtTokenUtil;
import com.marketplace.backend.exception.AppError;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {
    private final AppUserDetailsService userService;
    private final JwtTokenUtil jwtTokenUtil;
    private final AuthenticationManager authenticationManager;

    public AuthController(AppUserDetailsService userService, JwtTokenUtil jwtTokenUtil, AuthenticationManager authenticationManager) {
        this.userService = userService;
        this.jwtTokenUtil = jwtTokenUtil;
        this.authenticationManager = authenticationManager;
    }

    /*Почта pum@mail.ru Пароль 123456*/
    @PostMapping
    public ResponseEntity<?>  authentication(@RequestBody AuthRequestDto authRequest){
        System.out.println(authRequest);
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authRequest.getEmail(), authRequest.getPassword()));
        } catch (BadCredentialsException e) {
            return new ResponseEntity<>(new AppError(HttpStatus.UNAUTHORIZED.name(), "Неправильные почта или пароль"), HttpStatus.UNAUTHORIZED);
        }
        UserDetails userDetails = userService.loadUserByUsername(authRequest.getEmail());
        String token = jwtTokenUtil.generateToken(userDetails);
        return ResponseEntity.ok(new AuthResponse(token));
    }
    @PostMapping("/refresh")
    public ResponseEntity<?> refreshToken(){
        return ResponseEntity.ok(new AuthResponse("OK"));
    }
}
