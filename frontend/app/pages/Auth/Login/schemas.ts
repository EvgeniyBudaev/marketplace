import { z } from "zod";
import { EFormFields } from "#app/pages/Auth/Login/enums";
import {
  EMAIL_ERROR_MESSAGE,
  EMAIL_NOT_CYRILLIC_ERROR_MESSAGE,
  EMAIL_NOT_CYRILLIC_REGEXP,
  EMAIL_REGEXP,
  EMPTY_FIELD_ERROR_MESSAGE,
} from "#app/shared/validation";

export const formSchema = z.object({
  [EFormFields.Email]: z
    .string()
    .trim()
    .min(1, EMPTY_FIELD_ERROR_MESSAGE)
    .regex(EMAIL_NOT_CYRILLIC_REGEXP, EMAIL_NOT_CYRILLIC_ERROR_MESSAGE)
    .regex(EMAIL_REGEXP, EMAIL_ERROR_MESSAGE),
  [EFormFields.Password]: z.string().trim().min(1, EMPTY_FIELD_ERROR_MESSAGE),
});
