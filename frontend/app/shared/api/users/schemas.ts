import { z } from "zod";

export const userParamsSchema = z.object({
  access_token: z.string(),
});

export const userSchema = z.object({
  id: z.number(),
  firstName: z.string(),
  middleName: z.string().nullish(),
  lastName: z.string(),
  phone: z.string(),
  email: z.string(),
  shippingAddress: z.string().nullish(),
  isEmailVerified: z.boolean(),
  isPhoneVerified: z.boolean(),
  createdAt: z.string(),
  modifyDate: z.string(),
});
