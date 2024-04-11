import { z } from "zod";
import { userSchema } from "#app/shared/api/users/schemas";

const tokenSchema = z.object({
  access_token: z.string(),
  refresh_token: z.string(),
  expires_in: z.string(),
  refresh_expires_in: z.string(),
  token_type: z.string(),
  uuid: z.string(),
});

export const loginParamsSchema = z.object({
  email: z.string(),
  password: z.string(),
});

export const loginSchema = tokenSchema;

export const signupParamsSchema = z.object({
  firstName: z.string(),
  middleName: z.string().optional(),
  lastName: z.string(),
  phone: z.string(),
  email: z.string(),
  shippingAddress: z.string(),
  password: z.string(),
});

export const signupSchema = userSchema;

export const refreshTokenParamsSchema = z.object({
  refreshToken: z.string(),
});

export const refreshTokenSchema = tokenSchema;
