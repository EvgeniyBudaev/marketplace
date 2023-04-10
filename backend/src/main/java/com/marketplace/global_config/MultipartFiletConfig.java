package com.marketplace.global_config;

import org.springframework.boot.web.servlet.MultipartConfigFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.util.unit.DataSize;

import javax.servlet.MultipartConfigElement;

@Configuration
public class MultipartFiletConfig {
    @Bean
    MultipartConfigElement multipartConfigElement() {
        MultipartConfigFactory factory = new MultipartConfigFactory();
        DataSize fileSize = DataSize.ofKilobytes(750L);
        DataSize requestSize = DataSize.ofKilobytes(1024L);
        factory.setMaxFileSize(fileSize);
        factory.setMaxRequestSize(requestSize);
        return factory.createMultipartConfig();
    }
}
