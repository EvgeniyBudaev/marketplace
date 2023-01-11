package com.marketplace.mailing.service;


import com.marketplace.properties.AppProperties;
import com.marketplace.properties.events.MailPropertiesChangeEvent;
import com.marketplace.properties.model.EPropertiesType;
import com.marketplace.properties.model.properties.EmailProperty;
import com.marketplace.properties.service.PropertiesService;
import lombok.Getter;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.context.ApplicationListener;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.stereotype.Service;

import java.util.Properties;


@Service
@Getter
public class MailSender implements
        ApplicationListener<MailPropertiesChangeEvent>, InitializingBean {
    private final JavaMailSenderImpl mailSender = new JavaMailSenderImpl();
    private final PropertiesService propertiesService;
    private final AppProperties appProperties;

    public MailSender(PropertiesService propertiesService, AppProperties appProperties) {
        this.propertiesService = propertiesService;
        this.appProperties = appProperties;
    }


    @Override
    public void onApplicationEvent(MailPropertiesChangeEvent event) {
        EmailProperty newProperty = event.getProperty();
        updateMailProperty(newProperty);
    }


    public void updateMailProperty(EmailProperty emailProperty){
        this.mailSender.setHost(emailProperty.getSmtpServer().getHost());
        this.mailSender.setPort(emailProperty.getSmtpServer().getPortTLS());
        this.mailSender.setUsername(emailProperty.getEmail());
        this.mailSender.setPassword(emailProperty.getPassword());
        Properties props = mailSender.getJavaMailProperties();
        props.put("mail.transport.protocol", emailProperty.getSmtpServer().getTransportProtocol());
        props.put("mail.smtp.auth", emailProperty.getSmtpServer().getRequireAuth().toString());
        props.put("mail.smtp.starttls.enable", emailProperty.getSmtpServer().getEnabledTLS().toString());
    }

    @Override
    public void afterPropertiesSet() throws Exception {
       EmailProperty property = (EmailProperty) this.appProperties.getProperty(EPropertiesType.EMAIL);
       updateMailProperty(property);
    }
}
