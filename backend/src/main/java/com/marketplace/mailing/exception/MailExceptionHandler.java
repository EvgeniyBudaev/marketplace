package com.marketplace.mailing.exception;

import com.marketplace.backend.exception.AppError;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
@Slf4j
public class MailExceptionHandler {
    @ExceptionHandler
    public ResponseEntity<AppError> catchMailSenderNotPrepare(MailSenderNotPrepareException e){
        log.error(e.getMessage(), e);
        return new ResponseEntity<>(new AppError(HttpStatus.SERVICE_UNAVAILABLE.name(),
                e.getMessage()), HttpStatus.SERVICE_UNAVAILABLE);
    }
}
