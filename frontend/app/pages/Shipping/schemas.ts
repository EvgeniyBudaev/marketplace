import { z } from "zod";
import { EFormFields } from "~/pages/Shipping/enums";

export const formSchema = z.object({
  [EFormFields.Address]: z.string().trim(),
  [EFormFields.Comment]: z.string().trim().nullish(),
  [EFormFields.Flat]: z.string().trim().nullish(),
  [EFormFields.Floor]: z.string().trim().nullish(),
});
