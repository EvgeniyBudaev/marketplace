import { z } from "zod";
import { EMPTY_FIELD_ERROR_MESSAGE } from "#app/shared/validation";
import { EFormFields } from "#app/pages/Admin/Attributes/SelectableTable";

export const formSchema = z.object({
  [EFormFields.Value]: z.string().trim().min(1, EMPTY_FIELD_ERROR_MESSAGE),
});
