import { z } from "zod";
import { EFormFields } from "~/pages/Auth/Signup/enums";
import {
  EMAIL_ERROR_MESSAGE,
  EMAIL_NOT_CYRILLIC_ERROR_MESSAGE,
  EMAIL_NOT_CYRILLIC_REGEXP,
  EMAIL_REGEXP,
  EMPTY_FIELD_ERROR_MESSAGE,
} from "~/shared/validation";

export const formSchema = z
  .object({
    [EFormFields.FirstName]: z.string().trim().min(1, EMPTY_FIELD_ERROR_MESSAGE),
    [EFormFields.LastName]: z.string().trim().min(1, EMPTY_FIELD_ERROR_MESSAGE),
    [EFormFields.MiddleName]: z.string().trim().optional(),
    [EFormFields.Phone]: z.string().trim().min(11, EMPTY_FIELD_ERROR_MESSAGE),
    [EFormFields.Email]: z
      .string()
      .trim()
      .min(1, EMPTY_FIELD_ERROR_MESSAGE)
      .regex(EMAIL_NOT_CYRILLIC_REGEXP, EMAIL_NOT_CYRILLIC_ERROR_MESSAGE)
      .regex(EMAIL_REGEXP, EMAIL_ERROR_MESSAGE),
    [EFormFields.ShippingAddress]: z.string().trim().min(1, EMPTY_FIELD_ERROR_MESSAGE),
    [EFormFields.Password]: z.string().trim().min(1, EMPTY_FIELD_ERROR_MESSAGE),
    [EFormFields.RePassword]: z.string().trim().min(1, EMPTY_FIELD_ERROR_MESSAGE),
  })
  .superRefine(({ password, rePassword }, ctx) => {
    if (password !== rePassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: [EFormFields.Password],
        message: "The password did not match",
      });
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: [EFormFields.RePassword],
        message: "The confirm password did not match",
      });
    }
  });
