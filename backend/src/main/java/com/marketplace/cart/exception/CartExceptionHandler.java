package com.marketplace.cart.exception;

import com.marketplace.backend.exception.AppError;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
@Slf4j
public class CartExceptionHandler {
    @ExceptionHandler
    public ResponseEntity<AppError> catchProductCountException(ProductCountException e) {
        log.error(e.getMessage(), e);
        return new ResponseEntity<>(new AppError(HttpStatus.UNPROCESSABLE_ENTITY.name(),
                e.getMessage()), HttpStatus.UNPROCESSABLE_ENTITY);
    }

}
