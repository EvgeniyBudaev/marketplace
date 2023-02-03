import { z } from "zod";
import { paginationSchema } from "../commons";
import { catalogAttributeItemSchema } from "~/shared/api/catalogs";

export const attributesItemSchema = z.object({
  id: z.number(),
  name: z.string(),
  alias: z.string(),
  type: z.string(),
  filter: z.boolean(),
});

export const attributesSchema = paginationSchema.extend({
  content: attributesItemSchema.array(),
});

export const attributesParamsSchema = z.any();

export const attributeAddParamsSchema = z.object({
  alias: z.string(),
  name: z.string(),
  type: z.string(),
  selectable: z.object({
    value: z.string(),
  }).array(),
});

export const attributeAddSelectableItemSchema = z.object({
  id: z.number(),
  attributeId: z.number(),
  value: z.string(),
});

export const attributeAddSchema = z.object({
  id: z.number(),
  name: z.string(),
  alias: z.string(),
  type: z.string().nullish(),
  filter: z.boolean(),
  selectable: attributeAddSelectableItemSchema.array().nullish(),
});
