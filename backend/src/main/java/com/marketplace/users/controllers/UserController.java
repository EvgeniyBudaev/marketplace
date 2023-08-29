package com.marketplace.users.controllers;

import com.marketplace.users.dto.auth.response.AuthResponseDto;
import com.marketplace.users.dto.user.request.RegisterUserRequestDto;
import com.marketplace.users.dto.user.response.EmailApprovedResponseDto;
import com.marketplace.users.dto.user.response.UserInfoResponseDto;
import com.marketplace.users.model.AppUser;
import com.marketplace.users.service.AuthService;
import com.marketplace.users.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.security.Principal;

@RestController
@RequestMapping("/api/v1/users")
public class UserController {
    private final UserService userService;
    private final AuthService authService;

    @Autowired
    public UserController(UserService userService, AuthService authService) {
        this.userService = userService;
        this.authService = authService;
    }

    @PostMapping("/register")
    public AuthResponseDto saveOrUpdate(@Valid @RequestBody RegisterUserRequestDto dto) {
        AppUser user =  userService.registerNewUser(dto);
        return authService.getAuthResponseDto(user);
    }

    @GetMapping("/me")
    public UserInfoResponseDto userInfo(Principal principal) {
        if (principal == null) {
            throw new AccessDeniedException("Вы не авторизованы");
        }
        AppUser user = userService.getUserByEmail(principal.getName());
        return new UserInfoResponseDto(user);
    }

    @GetMapping("/userinfo/{id}")
    public UserInfoResponseDto userInfoByUserId(@PathVariable Long id,Principal principal){
        if (principal == null) {
            throw new AccessDeniedException("Вы не авторизованы");
        }
        AppUser user = userService.findUserById(id);
        return new UserInfoResponseDto(user);
    }

    @GetMapping("/activate/email")
    public EmailApprovedResponseDto accountActivateByEmail(@RequestParam String token, @RequestParam String email) {
        boolean result = userService.activateEmail(token, email);
        return new EmailApprovedResponseDto(result);
    }
}
