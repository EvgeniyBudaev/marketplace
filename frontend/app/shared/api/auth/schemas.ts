import { z } from "zod";
import { userSchema } from "~/shared/api/users/schemas";

export const loginParamsSchema = z.object({
  email: z.string(),
  password: z.string(),
});

export const loginSchema = z.object({
  access_token: z.string(),
  refresh_token: z.string(),
  expires_in: z.string(),
  refresh_expires_in: z.string(),
  token_type: z.string(),
});

export const signupParamsSchema = z.object({
  firstName: z.string(),
  middleName: z.string().optional(),
  lastName: z.string(),
  phone: z.string(),
  email: z.string(),
  shippingAddress: z.string(),
  password: z.string(),
});

// export const signupSchema = z.object({
//   id: z.number(),
//   firstName: z.string(),
//   middleName: z.string().optional(),
//   lastName: z.string(),
//   phone: z.string(),
//   email: z.string(),
//   shippingAddress: z.string(),
// });

export const signupSchema = z.any();
