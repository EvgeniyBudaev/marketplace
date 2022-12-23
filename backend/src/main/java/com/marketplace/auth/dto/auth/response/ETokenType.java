package com.marketplace.auth.dto.auth.response;

public enum ETokenType {
    BEARER("Bearer");

    private final String type;
    ETokenType(String type){
        this.type=type;
    }

    public String getType() {
        return type;
    }
}
