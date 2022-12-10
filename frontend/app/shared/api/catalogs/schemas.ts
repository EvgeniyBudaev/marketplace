import { z } from "zod";

const catalogAttributeValueItemSchema = z.object({
  id: z.number(),
  value: z.string(),
});

export const catalogAttributeItemSchema = z.object({
  id: z.number(),
  name: z.string(),
  alias: z.string(),
  values: catalogAttributeValueItemSchema.array(),
});

export const catalogDetailSchema = z.object({
  id: z.number(),
  name: z.string(),
  alias: z.string(),
  image: z.string().nullish(),
  enabled: z.boolean(),
  selectAttribute: catalogAttributeItemSchema.array(),
});

export const catalogDetailRequestSchema = z.object({
  alias: z.string(),
});
