package com.marketplace.properties.model.convertes;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;

@Slf4j
public class PropertiesConverter {

    private final ObjectMapper objectMapper = new ObjectMapper();
    public String convertToDatabaseColumn(EmailProperty property) {
        String emailPropertyString = null;
        try {
            emailPropertyString = objectMapper.writeValueAsString(property);
        }catch (final JsonProcessingException e){
            log.error(e.getMessage()+":::"+property.toString());
        }
        System.out.println(emailPropertyString);
        return emailPropertyString;
    }


    public EmailProperty convertToEntityAttribute(String s) {
        EmailProperty emailProperty =null;
        try {
             emailProperty = objectMapper.readValue(s, EmailProperty.class);

        } catch (JsonProcessingException e) {
            log.error(e.getMessage()+":::"+s);
        }
        //TODO убрать при использовании Vault
        assert emailProperty != null;
        emailProperty.setPassword("zhalbbzrnepupqrt");
        return emailProperty;
    }


}
