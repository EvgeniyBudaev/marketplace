import { z } from "zod";
import { EFormFields } from "~/pages/Recipient/enums";
import {
  EMAIL_ERROR_MESSAGE,
  EMAIL_NOT_CYRILLIC_ERROR_MESSAGE,
  EMAIL_NOT_CYRILLIC_REGEXP,
  EMAIL_REGEXP,
  EMPTY_FIELD_ERROR_MESSAGE,
} from "~/shared/validation";

export const formSchema = z.object({
  [EFormFields.Name]: z.string().trim().min(1, EMPTY_FIELD_ERROR_MESSAGE),
  [EFormFields.Surname]: z.string().trim().min(1, EMPTY_FIELD_ERROR_MESSAGE),
  [EFormFields.Phone]: z.string().trim().min(11, EMPTY_FIELD_ERROR_MESSAGE),
  [EFormFields.Email]: z
    .string()
    .trim()
    .min(1, EMPTY_FIELD_ERROR_MESSAGE)
    .regex(EMAIL_NOT_CYRILLIC_REGEXP, EMAIL_NOT_CYRILLIC_ERROR_MESSAGE)
    .regex(EMAIL_REGEXP, EMAIL_ERROR_MESSAGE),
});
