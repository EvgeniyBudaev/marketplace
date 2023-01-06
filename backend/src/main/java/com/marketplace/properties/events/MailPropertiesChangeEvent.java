package com.marketplace.properties.events;

import com.marketplace.properties.model.convertes.EmailProperty;
import lombok.Getter;
import lombok.Setter;
import org.springframework.context.ApplicationEvent;
@Getter
@Setter
public class MailPropertiesChangeEvent extends ApplicationEvent {
    private EmailProperty property;
    public MailPropertiesChangeEvent(EmailProperty property) {
        super(property);
        this.property =property;
    }
}
