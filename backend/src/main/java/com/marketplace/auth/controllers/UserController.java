package com.marketplace.auth.controllers;

import com.marketplace.auth.dto.user.request.RegisterUserRequestDto;
import com.marketplace.auth.dto.user.response.UserAfterUpdateResponseDto;
import com.marketplace.auth.dto.user.response.UserInfoResponseDto;
import com.marketplace.auth.service.UserService;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.security.Principal;

@RestController
@RequestMapping("/api/v1/users")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public UserAfterUpdateResponseDto saveOrUpdate(@Valid @RequestBody RegisterUserRequestDto dto){
        return userService.saveNewUser(dto);
    }

    @GetMapping("/me")
    public UserInfoResponseDto userInfo(Principal principal){
        return  userService.getUserInfo(principal.getName());
    }
}
