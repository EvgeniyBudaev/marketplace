import { z } from "zod";
import { paginationParamsSchema, paginationSchema } from "~/shared/api/commons";

export const orderParamsSchema = z.object({
  paymentVariantId: z.string(),
  uuid: z.string(),
});

export const orderSchema = z.object({
  success: z.boolean(),
});

export const orderListParamsSchema = paginationParamsSchema.extend({
  statuses: z.string().nullish(),
});

const recipientSchema = z.object({
  email: z.string().nullish(),
  name: z.string().nullish(),
  phone: z.string().nullish(),
  surname: z.string().nullish(),
});

const shippingAddressSchema = z.object({
  address: z.string().nullish(),
  comment: z.string().nullish(),
  flat: z.string().nullish(),
  floor: z.string().nullish(),
});

export const orderListItemSchema = z.object({
  createdAt: z.string(),
  id: z.number(),
  modifyDate: z.string(),
  orderAmount: z.string(),
  recipient: recipientSchema.nullish(),
  shippingAddress: shippingAddressSchema.nullish(),
  status: z.string(),
});

export const orderListSchema = paginationSchema.extend({
  content: orderListItemSchema.array().nullish(),
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
  productId: z.number(),
  quantity: z.number(),
});

export const orderDetailSchema = z.object({
  countProducts: z.number(),
  createdAt: z.string(),
  items: orderDetailListItemSchema.array(),
  modifyDate: z.string(),
  orderAmount: z.string(),
  paymentVariant: z.string(),
  recipient: recipientSchema.nullish(),
  shippingAddress: shippingAddressSchema.nullish(),
  status: z.string(),
});

export const orderEditParamsSchema = z.object({
  id: z.number(),
  items: orderDetailListItemSchema.array(),
  paymentVariantId: z.number(),
  recipient: recipientSchema.nullish(),
  shippingAddress: shippingAddressSchema.nullish(),
  status: z.string(),
});

// export const orderEditSchema = z.object({
//   countProducts: z.number(),
//   createdAt: z.string(),
//   id: z.number(),
//   items: orderDetailListItemSchema.array(),
//   modifyDate: z.string(),
//   orderAmount: z.string(),
//   paymentVariant: z.string(),
//   recipient: recipientSchema.nullish(),
//   shippingAddress: shippingAddressSchema.nullish(),
//   status: z.string(),
// });

export const orderEditSchema = z.any();
