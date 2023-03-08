import { z } from "zod";
import { paginationSchema } from "../commons";

const catalogAttributeValueItemSchema = z.object({
  id: z.number(),
  value: z.string(),
});

export const catalogSelectAttributeItemSchema = z.object({
  id: z.number(),
  name: z.string(),
  alias: z.string(),
  values: catalogAttributeValueItemSchema.array(),
});

export const catalogNumberAttributeItemSchema = z.object({
  id: z.number(),
  name: z.string(),
  attributeAlias: z.string(),
});

export const catalogDetailSchema = z.object({
  id: z.number(),
  name: z.string(),
  alias: z.string(),
  image: z.string().nullish(),
  enabled: z.boolean(),
  createdAt: z.string(),
  modifyDate: z.string(),
  // selectAttribute: catalogSelectAttributeItemSchema.array().nullish(),
  // numberAttribute: catalogNumberAttributeItemSchema.array().nullish(),
  selectAttribute: z.any(),
  numberAttribute: z.any(),
});

export const catalogDetailParamsSchema = z.object({
  alias: z.string(),
});

export const catalogsItemSchema = z.object({
  id: z.number(),
  name: z.string(),
  alias: z.string(),
  image: z.string().nullish(),
  enabled: z.boolean(),
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
  // selectAttribute: catalogSelectAttributeItemSchema.array().nullish(),
  // numberAttribute: catalogNumberAttributeItemSchema.array().nullish(),
  selectAttribute: z.any(),
  numberAttribute: z.any(),
});

export const catalogDeleteParamsSchema = z.object({
  alias: z.string(),
});

export const catalogDeleteSchema = z.any();

export const catalogEditParamsSchema = z.object({
  alias: z.string(),
  attributeAlias: z.string().array(),
  enabled: z.boolean(),
  id: z.number(),
  image: z.string(),
  name: z.string(),
});

export const catalogEditSchema = z.object({
  alias: z.string(),
  createdAt: z.string(),
  enabled: z.boolean(),
  id: z.number(),
  image: z.string().nullish(),
  modifyDate: z.string(),
  name: z.string(),
  // numberAttribute: catalogNumberAttributeItemSchema.array().nullish(),
  // selectAttribute: catalogSelectAttributeItemSchema.array().nullish(),
  selectAttribute: z.any(),
  numberAttribute: z.any(),
});
