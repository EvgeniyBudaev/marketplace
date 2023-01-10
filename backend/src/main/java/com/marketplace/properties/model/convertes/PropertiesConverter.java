package com.marketplace.properties.model.convertes;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;

@Slf4j
public class PropertiesConverter {

    private final ObjectMapper objectMapper = new ObjectMapper();
    public String convertToDatabaseColumn(Object property) {
        String propertyString = null;
        try {
            propertyString = objectMapper.writeValueAsString(property);
        }catch (final JsonProcessingException e){
            log.error(e.getMessage()+":::"+property.toString());
        }
        return propertyString;
    }


    public Object convertToEntityAttribute(String s, Class<?> tClass) {
        Object property =null;
        try {
             property = objectMapper.readValue(s, tClass);
        } catch (JsonProcessingException e) {
            log.error(e.getMessage()+":::"+s);
        }
       return property;
    }


}
