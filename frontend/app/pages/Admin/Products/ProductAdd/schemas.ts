import { z } from "zod";
import { EFormFields } from "~/pages/Admin/Products/ProductAdd/enums";
import { EMPTY_FIELD_ERROR_MESSAGE } from "~/shared/validation";

// export const formSchema = z.object({
//   [EFormFields.Alias]: z.string().trim().min(1, EMPTY_FIELD_ERROR_MESSAGE),
//   [EFormFields.CatalogAlias]: z.object({
//     label: z.string().trim().min(1, EMPTY_FIELD_ERROR_MESSAGE),
//     value: z.string().trim().min(1, EMPTY_FIELD_ERROR_MESSAGE),
//   }),
//   [EFormFields.Count]: z.string().trim().min(1, EMPTY_FIELD_ERROR_MESSAGE),
//   [EFormFields.Description]: z.string().trim().min(1, EMPTY_FIELD_ERROR_MESSAGE),
//   [EFormFields.Enabled]: z.boolean(),
//   [EFormFields.Name]: z.string().trim().min(1, EMPTY_FIELD_ERROR_MESSAGE),
//   [EFormFields.Price]: z.string().trim().min(1, EMPTY_FIELD_ERROR_MESSAGE),
// });

export const formSchema = z.any();
