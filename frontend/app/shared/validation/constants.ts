import { t } from "~/utils";

export const LETTERS_EN = "a-zA-Z";
export const LETTERS_RU = "а-яА-ЯёЁ";

export const EMAIL_ERROR_MESSAGE = t("common.validation.email");
export const EMAIL_REGEXP =
  /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const EMAIL_NOT_CYRILLIC_REGEXP = new RegExp(`^[^${LETTERS_RU}]*$`);
export const EMAIL_NOT_CYRILLIC_ERROR_MESSAGE = t("common.validation.cyrillicEmail");
export const EMPTY_FIELD_ERROR_MESSAGE = t("common.validation.empty");

export const NAME_REGEXP = new RegExp(`^[- ${LETTERS_EN}${LETTERS_RU}]*$`);
export const NAME_ERROR_MESSAGE = t("common.validation.onlyLetters");

export const PASSWORD_ERROR_MESSAGE = t("common.validation.passwordNotMatch");

// export const PHONE_REGEXP = /^[-+\d() ]*$/;
// export const PHONE_REGEXP = /\+7\s?\(?\d\d\d\)?\s?\d\d\d\s?\d\d\s?\d\d/;
export const PHONE_REGEXP = /(\+7)(\d{3})(\d{3})(\d{2})(\d{2})/g;
// export const PHONE_ERROR_MESSAGE = t("common.validation.wrongCharacter", {
//     characters: '0-9, "-", " ", "+", "(", ")"',
// });
export const PHONE_ERROR_MESSAGE = t("common.validation.wrongCharacter");
