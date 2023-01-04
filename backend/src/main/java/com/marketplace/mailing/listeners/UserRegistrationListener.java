package com.marketplace.mailing.listeners;

import com.marketplace.users.events.RegistrationUserCompleteEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.stereotype.Component;

@Component
public class UserRegistrationListener implements
        ApplicationListener<RegistrationUserCompleteEvent> {
    @Override
    public void onApplicationEvent(RegistrationUserCompleteEvent event) {
        eventHandler(event);
    }

    private void eventHandler(RegistrationUserCompleteEvent event){
        System.out.println(event.getUser().toString());
    }
}
