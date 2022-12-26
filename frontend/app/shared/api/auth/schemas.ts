import { z } from "zod";

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
