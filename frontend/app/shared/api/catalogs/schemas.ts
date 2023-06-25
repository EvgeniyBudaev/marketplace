import {z} from "zod";
import {fileSchema, filesSchema} from "~/shared/api/upload";
import {paginationSchema} from "../commons";
import {EMPTY_FIELD_ERROR_MESSAGE} from "~/shared/validation";

const catalogAttributeValueItemSchema = z.object({
  id: z.number(),
  value: z.string(),
});

export const catalogSelectAttributeItemSchema = z.object({
  id: z.number(),
  name: z.string(),
  alias: z.string(),
  values: catalogAttributeValueItemSchema.array().nullish(),
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
  selectAttribute: catalogSelectAttributeItemSchema.array().nullish(),
  numberAttribute: z
    .object({
      id: z.number(),
      name: z.string(),
      alias: z.string(),
      min: z.number(),
      max: z.number(),
    })
    .array()
    .nullish(),
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

export const catalogAddParamsSchema = z.any();

export const catalogAddSchema = z.object({
  id: z.number(),
  name: z.string(),
  alias: z.string(),
  image: z.string().nullish(),
  enabled: z.boolean(),
  createdAt: z.string(),
  modifyDate: z.string(),
  selectAttribute: catalogSelectAttributeItemSchema.array().nullish(),
  numberAttribute: z
    .object({
      id: z.number(),
      name: z.string(),
      alias: z.string(),
    })
    .array()
    .nullish(),
});

export const catalogDeleteParamsSchema = z.object({
  alias: z.string(),
});

export const catalogDeleteSchema = z.any();

export const catalogEditParamsSchema = z.any();

export const catalogEditSchema = z.object({
  alias: z.string(),
  createdAt: z.string(),
  enabled: z.boolean(),
  id: z.number(),
  image: z.string().nullish(),
  modifyDate: z.string(),
  name: z.string(),
  numberAttribute: z
    .object({
      id: z.number(),
      name: z.string(),
      alias: z.string(),
    })
    .array()
    .nullish(),
  selectAttribute: catalogSelectAttributeItemSchema.array().nullish(),
});
