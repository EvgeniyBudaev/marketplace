export const LETTERS_EN = "a-zA-Z";
export const LETTERS_RU = "а-яА-ЯёЁ";

export const EMAIL_ERROR_MESSAGE = "email is not valid";
export const EMAIL_REGEXP =
  /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const EMAIL_NOT_CYRILLIC_REGEXP = new RegExp(`^[^${LETTERS_RU}]*$`);
export const EMAIL_NOT_CYRILLIC_ERROR_MESSAGE = "email is not used cyrillic";
export const EMPTY_FIELD_ERROR_MESSAGE = "field is required";

export const PHONE_REGEXP = /^[-+\d() ]*$/;
export const PHONE_ERROR_MESSAGE = "wrong phone number";
