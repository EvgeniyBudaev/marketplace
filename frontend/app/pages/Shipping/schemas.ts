import { z } from "zod";
import { EFormFields } from "~/pages/Shipping/enums";

export const formSchema = z.object({
  [EFormFields.Address]: z.string().trim(),
  [EFormFields.Apartment]: z.string().trim().optional(),
  [EFormFields.Comment]: z.string().trim().optional(),
  [EFormFields.Entrance]: z.string().trim().optional(),
  [EFormFields.Floor]: z.string().trim().optional(),
  [EFormFields.Intercom]: z.string().trim().optional(),
});
