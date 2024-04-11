import { z } from "zod";
import { EFormFields } from "#app/pages/Admin/Attributes/AttributeAdd/enums";
import { EMPTY_FIELD_ERROR_MESSAGE } from "#app/shared/validation";

export const formSchema = z.object({
  [EFormFields.Alias]: z.string().trim().min(1, EMPTY_FIELD_ERROR_MESSAGE),
  [EFormFields.Name]: z.string().trim().min(1, EMPTY_FIELD_ERROR_MESSAGE),
  // [EFormFields.Selectable]: z.string().trim().min(1, EMPTY_FIELD_ERROR_MESSAGE),
  [EFormFields.Filter]: z.boolean(),
  [EFormFields.Type]: z.object({
    label: z.string().trim().min(1, EMPTY_FIELD_ERROR_MESSAGE),
    value: z.string().trim().min(1, EMPTY_FIELD_ERROR_MESSAGE),
  }),
});
