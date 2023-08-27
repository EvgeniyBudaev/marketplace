import { z } from "zod";

export const tableOrderListItemSchema = z.object({
  createdAt: z.string(),
  id: z.number(),
  modifyDate: z.string(),
  orderAmount: z.string(),
  recipientEmail: z.string().nullish(),
  recipientName: z.string().nullish(),
  recipientPhone: z.string().nullish(),
  recipientSurname: z.string().nullish(),
  status: z.string(),
});
