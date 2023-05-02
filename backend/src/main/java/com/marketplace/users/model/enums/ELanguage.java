package com.marketplace.users.model.enums;

public enum ELanguage {
    RU("ru"), EN("en");
    private final String name;

    ELanguage(String name){
        this.name=name;
    }

    public String getName(){
        return this.name;
    }
}
