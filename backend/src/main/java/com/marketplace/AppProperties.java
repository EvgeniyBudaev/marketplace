package com.marketplace;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.context.properties.ConstructorBinding;

@ConstructorBinding
@ConfigurationProperties(prefix = "jwt")
@Data
public class AppProperties {
    private String secret;
    private Integer jwtLifetime;
    private Integer jwtRefreshLifetime;
}
