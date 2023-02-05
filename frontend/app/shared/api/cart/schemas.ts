import { z } from "zod";
import { productsByCatalogItemSchema } from "~/shared/api/products";

export const cartItemSchema = z.object({
  amount: z.string(),
  id: z.number(),
  price: z.string(),
  product: productsByCatalogItemSchema,
  quantity: z.number(),
});

export const cartParamsSchema = z.object({
  uuid: z.string().nullable(),
});

export const cartSchema = z.object({
  uuid: z.string(),
  createdAt: z.string(),
  modifyDate: z.string(),
  items: cartItemSchema.array().nullable(),
  cartAmount: z.string(),
  countProducts: z.string(),
});

export const cartItemIncrementParamsSchema = z.object({
  uuid: z.string(),
  productAlias: z.string(),
});

export const cartItemDecrementParamsSchema = z.object({
  uuid: z.string(),
  productAlias: z.string(),
});

export const cartItemRemoveParamsSchema = z.object({
  uuid: z.string(),
  productAlias: z.string(),
});

export const cartItemSetQuantityParamsSchema = z.object({
  uuid: z.string(),
  productAlias: z.string(),
  newQuantity: z.number(),
});
