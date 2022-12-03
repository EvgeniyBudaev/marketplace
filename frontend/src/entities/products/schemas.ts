import { z } from "zod";
import { paginationSchema } from "../commons";

const attributeItemSchema = z.object({
  attributeName: z.string(),
  value: z.union([z.string(), z.number()]),
});

export const productsItemSchema = z.object({
  catalogAlias: z.string(),
  id: z.number(),
  name: z.string(),
  alias: z.string(),
  enabled: z.boolean(),
  description: z.string().nullish(),
  rating: z.number(),
  price: z.string(),
  doubleValues: attributeItemSchema.array(),
  stringValues: attributeItemSchema.array(),
  integerValues: attributeItemSchema.array(),
});

export const productsSchema = paginationSchema.extend({
  content: productsItemSchema.array(),
});
