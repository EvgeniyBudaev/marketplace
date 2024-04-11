import { z } from "zod";
import { EFormFields } from "#app/pages/Admin/Catalogs/CatalogAdd/enums";
import { EMPTY_FIELD_ERROR_MESSAGE } from "#app/shared/validation";

// export const formSchema = z.object({
//   [EFormFields.Alias]: z.string().trim().min(1, EMPTY_FIELD_ERROR_MESSAGE),
//   [EFormFields.Enabled]: z.boolean(),
//   [EFormFields.Image]: z.string().trim().min(1, EMPTY_FIELD_ERROR_MESSAGE),
//   [EFormFields.Name]: z.string().trim().min(1, EMPTY_FIELD_ERROR_MESSAGE),
//   [EFormFields.AttributeAlias]: z.union([
//     z.object({
//       label: z.string().trim().min(1, EMPTY_FIELD_ERROR_MESSAGE),
//       value: z.string().trim().min(1, EMPTY_FIELD_ERROR_MESSAGE),
//     }),
//     z
//       .object({
//         label: z.string().trim().min(1, EMPTY_FIELD_ERROR_MESSAGE),
//         value: z.string().trim().min(1, EMPTY_FIELD_ERROR_MESSAGE),
//       })
//       .array(),
//   ]),
// });

export const formSchema = z.any();
