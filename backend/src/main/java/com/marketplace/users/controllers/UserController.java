package com.marketplace.users.controllers;

import com.marketplace.users.dto.user.request.RegisterUserRequestDto;
import com.marketplace.users.dto.user.response.UserInfoResponseDto;
import com.marketplace.users.model.AppUser;
import com.marketplace.users.service.UserService;
import org.springframework.security.access.AccessDeniedException;
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
    public UserInfoResponseDto saveOrUpdate(@Valid @RequestBody RegisterUserRequestDto dto){
        return userService.registerNewUser(dto);
    }

    @GetMapping("/me")
    public UserInfoResponseDto userInfo(Principal principal){
        if(principal==null){
            throw new AccessDeniedException("Вы не авторизованы");
        }
        AppUser user  = userService.getUserByEmail(principal.getName());
        return  new UserInfoResponseDto(user);
    }

    @GetMapping("/activate/mail/{token}")
    public void accountActivateByEmail(@PathVariable String token){
        userService.activateUserByEmail(token);
    }
}
