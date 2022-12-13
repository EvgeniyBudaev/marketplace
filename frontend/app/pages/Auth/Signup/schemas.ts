import { z } from "zod";
import { EFormFields } from "~/pages/Auth/Signup/enums";

export const formSchema = z.object({
  [EFormFields.FirstName]: z.string().trim(),
  [EFormFields.LastName]: z.string().trim(),
  [EFormFields.MiddleName]: z.string().trim().optional(),
  [EFormFields.PhoneNumber]: z.string().trim(),
  [EFormFields.Email]: z.string().trim(),
  [EFormFields.Password]: z.string().trim(),
  [EFormFields.RePassword]: z.string().trim(),
});
