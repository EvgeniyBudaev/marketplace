package com.marketplace.properties.model;

import com.marketplace.properties.model.properties.EmailProperty;
import com.marketplace.properties.model.properties.EmailVerifyProperties;
import com.marketplace.properties.model.properties.JwtProperties;

public enum EPropertiesType {
    EMAIL(EmailProperty.class), JWT(JwtProperties.class), EMAIL_VERIFY(EmailVerifyProperties.class);
    private final Class<?> propertyClass;

    EPropertiesType(Class<?> propertyClass) {
        this.propertyClass = propertyClass;
    }

    public Class<?> getPropertyClass() {
        return this.propertyClass;
    }

}
