import { z } from "zod";
import { paginationSchema } from "../commons";

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

export const catalogDetailParamsSchema = z.object({
  alias: z.string(),
});

export const catalogsItemSchema = z.object({
  id: z.number(),
  name: z.string(),
  alias: z.string(),
  image: z.string().nullish(),
  createdAt: z.string(),
  modifyDate: z.string(),
});

export const catalogsSchema = paginationSchema.extend({
  content: catalogsItemSchema.array(),
});

export const catalogsParamsSchema = z.any();

export const catalogAddParamsSchema = z.object({
  alias: z.string(),
  enabled: z.boolean(),
  image: z.string(),
  name: z.string(),
});

export const catalogAddSchema = z.object({
  id: z.number(),
  name: z.string(),
  alias: z.string(),
  image: z.string().nullish(),
  enabled: z.boolean(),
  createdAt: z.string(),
  modifyDate: z.string(),
  selectAttribute: catalogAttributeItemSchema.array().nullish(),
  numberAttribute: catalogAttributeItemSchema.array().nullish(),
});

export const catalogDeleteParamsSchema = z.object({
  alias: z.string(),
});

export const catalogDeleteSchema = z.any();
