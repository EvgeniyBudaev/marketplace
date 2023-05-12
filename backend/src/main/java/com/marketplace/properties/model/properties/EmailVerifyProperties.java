package com.marketplace.properties.model.properties;

import com.marketplace.properties.model.EPropertiesType;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class EmailVerifyProperties implements PropertiesType {
    private long period;

    @Override
    public EPropertiesType getPropertiesType() {
        return EPropertiesType.EMAIL_VERIFY;
    }
}
