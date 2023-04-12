package com.marketplace.mailing.exception;

public class MailSenderNotPrepareException extends RuntimeException {
    public MailSenderNotPrepareException(String message) {
        super(message);
    }
}
