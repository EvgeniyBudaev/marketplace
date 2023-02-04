package com.marketplace.backend.exception;

public class AppSqlException extends RuntimeException{
    public AppSqlException(String message) {
        super(message);
    }
}
