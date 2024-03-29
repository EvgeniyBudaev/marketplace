import { z } from "zod";
import { paginationSchema } from "../commons";

const attributeItemSchema = z.object({
  attributeName: z.string(),
  attributeAlias: z.string(),
  value: z.string(),
});

export const productsItemSchema = z.object({
  id: z.number(),
  name: z.string(),
  alias: z.string(),
  enabled: z.boolean(),
  modifyDate: z.string(),
  createdAt: z.string(),
  images: z.string().array().nullish(),
});

export const productsSchema = paginationSchema.extend({
  content: productsItemSchema.array().nullish(),
});

export const productsByCatalogItemSchema = z.object({
  catalogAlias: z.string(),
  id: z.number(),
  name: z.string(),
  alias: z.string(),
  enabled: z.boolean(),
  description: z.string().nullish(),
  rating: z.number(),
  price: z.string(),
  count: z.string(),
  createdAt: z.string(),
  attributes: attributeItemSchema.array(),
  images: z.string().array().nullish(),
  defaultImage: z.string().nullish(),
});

export const productsParamsSchema = z.any();

export const productsByCatalogSearchParamsSchema = z.object({
  alias: z.string(),
  params: z
    .object({
      currentPage: z.union([z.string(), z.number()]).nullish(),
      pageSize: z.union([z.string(), z.number()]).nullish(),
    })
    .optional(),
});
export const productsByCatalogSchema = paginationSchema.extend({
  content: productsByCatalogItemSchema.array(),
});

export const productDetailParamsSchema = z.object({
  alias: z.string(),
});

export const productDetailSchema = z.object({
  catalogAlias: z.string(),
  id: z.number(),
  name: z.string(),
  alias: z.string(),
  enabled: z.boolean(),
  description: z.string().nullish(),
  rating: z.number(),
  price: z.string(),
  count: z.string(),
  createdAt: z.string().nullish(),
  modifyDate: z.string().nullish(),
  attributes: attributeItemSchema.array(),
  images: z.string().array().nullish(),
  defaultImage: z.string().nullish(),
});

const numericValuesSchema = z.object({
  attributeAlias: z.string(),
  value: z.number(),
});

export const productAddParamsSchema = z.any();

export const productAddSchema = z.any();
// export const productAddSchema = productDetailSchema;

export const productDeleteParamsSchema = z.object({
  alias: z.string(),
});

export const productDeleteSchema = z.any();

export const productEditParamsSchema = z.any();

export const productEditSchema = productDetailSchema;

const attributeValuesSetItemSchema = z.object({
  id: z.number(),
  attributeType: z.string(),
  attributeName: z.string(),
  attributeAlias: z.string(),
  value: z.string(),
});

export const adminProductDetailParamsSchema = z.object({
  alias: z.string(),
});

export const adminProductDetailSchema = z.object({
  id: z.number(),
  name: z.string(),
  alias: z.string(),
  catalogAlias: z.string(),
  enabled: z.boolean(),
  description: z.string().nullish(),
  rating: z.number(),
  price: z.string(),
  count: z.string(),
  createdAt: z.string(),
  modifyDate: z.string(),
  attributeValuesSet: attributeValuesSetItemSchema.array(),
  images: z.string().array().nullish(),
  defaultImage: z.string().nullish(),
});
