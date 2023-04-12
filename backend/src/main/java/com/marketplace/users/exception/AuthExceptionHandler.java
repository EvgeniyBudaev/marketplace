package com.marketplace.users.exception;

import com.marketplace.backend.exception.AppError;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
@Slf4j
public class AuthExceptionHandler {
    @ExceptionHandler
    public ResponseEntity<AppError> catchAccessDenied(AccessDeniedException e) {
        log.error(e.getMessage(), e);
        return new ResponseEntity<>(new AppError(HttpStatus.UNAUTHORIZED.name(),
                e.getMessage()), HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler
    public ResponseEntity<AppError> catchUnauthorized(AuthenticationException e) {
        log.error(e.getMessage(), e);
        return new ResponseEntity<>(new AppError(HttpStatus.UNAUTHORIZED.name(),
                "Не правильное имя пользователя или пароль"), HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler
    public ResponseEntity<AppError> catchVerificationTokenExpired(VerificationTokenExpiredException e) {
        log.error(e.getMessage(), e);
        return new ResponseEntity<>(new AppError(HttpStatus.NOT_ACCEPTABLE.name(),
                "Токен верификации истек"), HttpStatus.UNAUTHORIZED);
    }
}
