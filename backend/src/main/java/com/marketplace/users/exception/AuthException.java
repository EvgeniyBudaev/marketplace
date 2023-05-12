package com.marketplace.users.exception;

import org.springframework.security.core.userdetails.UsernameNotFoundException;

public class AuthException extends UsernameNotFoundException {
    public AuthException() {
        super("Неверные учетные данные пользователя");
    }
}
