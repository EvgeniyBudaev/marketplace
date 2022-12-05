package com.marketplace.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class BackendApplication {

    /*TODO добавить ControllerAdvice*/
    /*TODO добавить к Attribute признак того что по ним можно строить фильтры*/
    public static void main(String[] args) {
        SpringApplication.run(BackendApplication.class, args);
    }

}
