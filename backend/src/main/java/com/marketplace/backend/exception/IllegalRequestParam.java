package com.marketplace.backend.exception;

public class IllegalRequestParam extends RuntimeException {
    public IllegalRequestParam(String message) {
        super(message);
    }
}
