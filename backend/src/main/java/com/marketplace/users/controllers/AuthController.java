package com.marketplace.users.controllers;

import com.marketplace.users.dto.auth.request.AuthRequestDto;
import com.marketplace.users.dto.auth.request.RefreshTokenUpdateRequestDto;
import com.marketplace.users.service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;


@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {
    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }


    /*Почта pum@mail.ru Пароль 123456 Тел: +79219516997*/
    @PostMapping
    public ResponseEntity<?>  authentication(@RequestBody AuthRequestDto authRequest){
        return authService.authentication(authRequest);
    }
    @PostMapping("/refresh")
    public ResponseEntity<?> refreshToken(@RequestBody @Valid RefreshTokenUpdateRequestDto dto){
        return authService.updateToken(dto.getRefreshToken());
    }
}
