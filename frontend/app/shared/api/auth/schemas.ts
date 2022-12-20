import { z } from "zod";

export const loginParamsSchema = z.object({
  email: z.string(),
  password: z.string(),
});

export const loginSchema = z.object({
  token: z.string(),
});
