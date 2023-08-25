package com.marketplace.mailing.listeners;

import com.marketplace.mailing.exception.MailSenderNotPrepareException;
import com.marketplace.mailing.service.AppMailSender;
import com.marketplace.users.events.RegistrationUserCompleteEvent;
import com.marketplace.users.model.AppUser;
import org.springframework.context.ApplicationListener;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.stereotype.Component;

@Component
public class UserRegistrationListener implements
        ApplicationListener<RegistrationUserCompleteEvent> {
    private final AppMailSender appMailSender;

    public UserRegistrationListener(AppMailSender appMailSender) {
        this.appMailSender = appMailSender;
    }

    @Override
    public void onApplicationEvent(RegistrationUserCompleteEvent event) {
        eventHandler(event);
    }

    private void eventHandler(RegistrationUserCompleteEvent event) {
        AppUser user = event.getUser();
        SimpleMailMessage message = new SimpleMailMessage();
        String from = appMailSender.getMailSender().getUsername();
        if (from == null) {
            throw new MailSenderNotPrepareException("Отсутствуют настройки почты");
        }
        message.setFrom(from);
        message.setTo(user.getEmail());
        message.setSubject("Регистрация на сайте");
        message
                .setText("Для завершения регистрации на сайте и подтверждения " +
                        "электронной почты перейдите по ссылке " + event.getReference());
        appMailSender.getMailSender().send(message);
    }
}
