package com.marketplace.users.events;

import com.marketplace.users.model.AppUser;
import lombok.Getter;
import lombok.Setter;
import org.springframework.context.ApplicationEvent;
@Getter
@Setter
public class RegistrationUserCompleteEvent extends ApplicationEvent {
    private final AppUser user;
    public RegistrationUserCompleteEvent(AppUser user) {
        super(user);
        this.user = user;
    }
}
