package com.marketplace.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class BackendApplication {

    /*TODO добавить ControllerAdvice*/
    /*TODO обсудить стринговый Attribute*/
    /*TODO доставать сущности только  enabled true*/
    public static void main(String[] args) {
        SpringApplication.run(BackendApplication.class, args);
    }

}
