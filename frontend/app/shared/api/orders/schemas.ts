import { z } from "zod";
import { paginationSchema } from "~/shared/api/commons";

export const orderParamsSchema = z.object({
  payment: z.string(),
  session: z.string(),
});

export const orderSchema = z.any();

export const orderListParamsSchema = z.object({
  payment: z.string(),
  session: z.string(),
});

export const orderListItemSchema = z.object({
  createdAt: z.string(),
  id: z.number(),
  orderAmount: z.string(),
  recipientEmail: z.string(),
  status: z.string(),
  updatedAt: z.string(),
});

export const orderListSchema = paginationSchema.extend({
  content: orderListItemSchema.array(),
});
