package com.marketplace.auth.controllers;

import com.marketplace.auth.dto.auth.request.AuthRequestDto;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    @PostMapping
    public String authentication(AuthRequestDto authRequest){
        return authRequest.toString();
    }
}
