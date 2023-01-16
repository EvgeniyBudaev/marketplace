import { z } from "zod";
import { EFormFields } from "~/pages/Admin/Catalogs/CatalogAdd/enums";
import { EMPTY_FIELD_ERROR_MESSAGE } from "~/shared/validation";

export const formSchema = z.object({
  [EFormFields.Alias]: z.string().trim().min(1, EMPTY_FIELD_ERROR_MESSAGE),
  [EFormFields.Enabled]: z.boolean(),
  [EFormFields.Image]: z.string().trim().min(1, EMPTY_FIELD_ERROR_MESSAGE),
  [EFormFields.Name]: z.string().trim().min(1, EMPTY_FIELD_ERROR_MESSAGE),
});
