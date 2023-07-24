package com.marketplace.global_config;

import org.springframework.boot.actuate.trace.http.HttpTraceRepository;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ActuatorConfig {
    @Bean
    public HttpTraceRepository httpTraceRepository() {
        return new ActuatorRepository();
    }
}
