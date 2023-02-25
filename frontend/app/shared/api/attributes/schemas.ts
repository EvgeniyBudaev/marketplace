import { z } from "zod";
import { paginationSchema } from "../commons";
import {
  catalogNumberAttributeItemSchema,
  catalogSelectAttributeItemSchema,
} from "~/shared/api/catalogs";

export const selectableItemSchema = z.object({
  id: z.number(),
  attributeId: z.number(),
  value: z.string(),
});

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
  selectable: z
    .object({
      value: z.string(),
    })
    .array(),
});

export const attributeAddSchema = z.object({
  id: z.number(),
  name: z.string(),
  alias: z.string(),
  type: z.string().nullish(),
  filter: z.boolean(),
  selectable: selectableItemSchema.array().nullish(),
});

export const attributeEditParamsSchema = z.object({
  id: z.number(),
  name: z.string(),
  alias: z.string(),
  type: z.string(),
  filter: z.boolean(),
  selectable: selectableItemSchema.array().nullish(),
});

export const attributeEditSchema = z.object({
  id: z.number(),
  name: z.string(),
  alias: z.string(),
  type: z.string().nullish(),
  filter: z.boolean(),
  createdAt: z.string().nullish(),
  modifyDate: z.string().nullish(),
  selectable: selectableItemSchema.array().nullish(),
});

export const attributeDeleteParamsSchema = z.object({
  alias: z.string(),
});

export const attributeDeleteSchema = z.any();

export const attributeDetailParamsSchema = z.object({
  alias: z.string(),
});

export const attributeDetailSchema = z.object({
  id: z.number(),
  name: z.string(),
  alias: z.string(),
  type: z.string(),
  filter: z.boolean(),
  createdAt: z.string(),
  modifyDate: z.string(),
  selectable: selectableItemSchema.array().nullish(),
});

export const selectableValueEditParamsSchema = z.object({
  id: z.number(),
  value: z.string(),
});

export const selectableValueEditSchema = z.any();

export const selectableValueDeleteParamsSchema = z.object({
  id: z.number(),
});

export const selectableValueDeleteSchema = z.any();

export const selectableValueAddParamsSchema = z.object({
  attributeAlias: z.string(),
  value: z.string(),
});

export const selectableValueAddSchema = selectableItemSchema.array();

export const attributesByCatalogParamsSchema = z.object({
  alias: z.string(),
});

export const attributesByCatalogSchema = z.object({
  alias: z.string(),
  numberAttribute: catalogNumberAttributeItemSchema.array().nullish(),
  selectableAttribute: catalogSelectAttributeItemSchema.array().nullish(),
});
