package com.marketplace.properties.events;

import com.marketplace.properties.model.properties.JwtProperties;
import lombok.Getter;
import lombok.Setter;
import org.springframework.context.ApplicationEvent;
@Getter
@Setter
public class JwtPropertiesChangeEvent extends ApplicationEvent {
    private JwtProperties jwtProperties;
    public JwtPropertiesChangeEvent(JwtProperties jwtProperties) {
        super(jwtProperties);
    }
}
