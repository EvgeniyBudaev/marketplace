import { z } from "zod";
import { EFormFields } from "~/pages/Shipping/enums";

export const formSchema = z.object({
  [EFormFields.Address]: z.string().trim(),
  [EFormFields.Apartment]: z.string().trim(),
  [EFormFields.Comment]: z.string().trim(),
  [EFormFields.Entrance]: z.string().trim(),
  [EFormFields.Floor]: z.string().trim(),
  [EFormFields.Intercom]: z.string().trim(),
});
