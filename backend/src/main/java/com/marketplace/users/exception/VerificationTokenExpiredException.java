package com.marketplace.users.exception;

public class VerificationTokenExpiredException extends RuntimeException {
    public VerificationTokenExpiredException(String message) {
        super(message);
    }
}
