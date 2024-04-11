import { z } from "zod";
import { EFormFields } from "#app/components/search";

export const formSchema = z.object({
  [EFormFields.Search]: z.string().trim(),
});
