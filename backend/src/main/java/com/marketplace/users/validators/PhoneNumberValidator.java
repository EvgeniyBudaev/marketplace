package com.marketplace.users.validators;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class PhoneNumberValidator implements ConstraintValidator<PhoneNumber, String> {
    @Override
    public void initialize(PhoneNumber constraintAnnotation) {
        ConstraintValidator.super.initialize(constraintAnnotation);
    }

    @Override
    public boolean isValid(String contactField, ConstraintValidatorContext validatorContext) {
        return contactField != null && contactField.matches("^\\+\\d{11}")
                && (contactField.length() > 8) && (contactField.length() < 14);
    }
}
