import { z } from "zod";
import { EFormFields } from "~/components/search";

export const formSchema = z.object({
  [EFormFields.Search]: z.string().trim(),
});
