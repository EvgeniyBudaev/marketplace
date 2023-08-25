package com.marketplace.mailing.listeners;

import com.marketplace.mailing.exception.MailSenderNotPrepareException;
import com.marketplace.mailing.service.EmailBodyProcessor;
import com.marketplace.mailing.service.AppMailSender;
import com.marketplace.order.events.AppOrderEvent;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

@Component
public class OrderEventsListener implements ApplicationListener<AppOrderEvent> {
    private final EmailBodyProcessor bodyProcessor;
    private final AppMailSender appMailSender;

    @Autowired
    public OrderEventsListener(EmailBodyProcessor bodyProcessor, AppMailSender appMailSender) {
        this.bodyProcessor = bodyProcessor;
        this.appMailSender = appMailSender;
    }

    @Override
    public void onApplicationEvent(AppOrderEvent event) {
        String emailBody = bodyProcessor.getHtmlEmailBody(event.getOrderEvents());
        MimeMessage message = appMailSender.getMailSender().createMimeMessage();
        try {
            message.setContent(emailBody,"text/html; charset=utf-8");
            MimeMessageHelper helper = new MimeMessageHelper(message, false);
            String from = appMailSender.getMailSender().getUsername();
            if (from == null) {
                throw new MailSenderNotPrepareException("Отсутствуют настройки почты");
            }
            helper.setSubject("Создание заказа в интернет магазине");
            helper.setTo(event.getOrderEvents().getOrder().getRecipientEmail());
            appMailSender.getMailSender().send(message);
            System.out.println("отправили письмо на почту "+event.getOrderEvents().getOrder().getRecipientEmail());
        } catch (MessagingException e) {
            throw new RuntimeException(e);
        }

    }
}
