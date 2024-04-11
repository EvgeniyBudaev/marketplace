import { z } from "zod";

export const shippingSchema = z.object({
  address: z.string().nullish(),
  comment: z.string().nullish(),
  flat: z.string().nullish(),
  floor: z.string().nullish(),
  modifyDate: z.string().nullish(),
});

export const shippingEditParamsSchema = z.object({
  address: z.string().nullish(),
  comment: z.string().nullish(),
  flat: z.string().nullish(),
  floor: z.string().nullish(),
  uuid: z.string(),
});

export const shippingParamsSchema = z.object({
  uuid: z.string(),
});
