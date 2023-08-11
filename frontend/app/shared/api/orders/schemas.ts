import { z } from "zod";
import { paginationParamsSchema, paginationSchema } from "~/shared/api/commons";

export const orderParamsSchema = z.object({
  payment: z.string(),
  session: z.string(),
});

export const orderSchema = z.any();

export const orderListParamsSchema = paginationParamsSchema.extend({
  statuses: z.string().nullish(),
});

export const orderListItemSchema = z.object({
  createdAt: z.string(),
  id: z.number(),
  modifyDate: z.string(),
  orderAmount: z.string(),
  recipientEmail: z.string(),
  status: z.string(),
});

export const orderListSchema = paginationSchema.extend({
  content: orderListItemSchema.array(),
});

export const orderDetailParamsSchema = z.object({
  id: z.string(),
});

export const orderDetailListItemSchema = z.object({
  amount: z.string(),
  id: z.number(),
  image: z.string().nullish(),
  name: z.string(),
  price: z.string(),
  quantity: z.number(),
});

export const orderDetailSchema = z.object({
  countProducts: z.number(),
  createdAt: z.string(),
  items: orderDetailListItemSchema.array(),
  modifyDate: z.string(),
  orderAmount: z.string(),
});
