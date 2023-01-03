package com.marketplace.properties.model.convertes;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;

@Slf4j
@Converter
public class EmailPropertiesConverter implements AttributeConverter<EmailProperty,String> {
    private final ObjectMapper objectMapper = new ObjectMapper();
    @Override
    public String convertToDatabaseColumn(EmailProperty emailProperty) {
        String emailPropertyString = null;
        try {
            emailPropertyString = objectMapper.writeValueAsString(emailProperty);
        }catch (final JsonProcessingException e){
            log.error(e.getMessage()+":::"+emailProperty.toString());
        }
        System.out.println(emailPropertyString);
        return emailPropertyString;
    }

    @Override
    public EmailProperty convertToEntityAttribute(String s) {
        EmailProperty emailProperty =null;
        try {
             emailProperty = objectMapper.readValue(s, EmailProperty.class);

        } catch (JsonProcessingException e) {
            log.error(e.getMessage()+":::"+s);
        }
        return emailProperty;
    }
}
