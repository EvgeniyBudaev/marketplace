import { z } from "zod";

const attributeItemSchema = z.object({
  id: z.number(),
  title: z.string(),
  type: z.string(),
});

export const catalogDetailSchema = z.object({
  id: z.number(),
  name: z.string(),
  alias: z.string(),
  image: z.string().nullish(),
  enabled: z.boolean(),
  attribute: attributeItemSchema.array(),
});
