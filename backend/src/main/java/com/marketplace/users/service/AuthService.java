package com.marketplace.users.service;


import com.marketplace.users.dto.auth.request.AuthRequestDto;
import com.marketplace.users.model.AppUser;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;


@Service
public class AuthService {

    private final AuthenticationManager authenticationManager;
    private final AppUserDetailsService userDetailsService;
    private final RefreshTokenService refreshTokenService;


    public AuthService(AuthenticationManager authenticationManager, AppUserDetailsService userDetailsService, RefreshTokenService refreshTokenService) {
        this.authenticationManager = authenticationManager;
        this.userDetailsService = userDetailsService;
        this.refreshTokenService = refreshTokenService;
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
}
