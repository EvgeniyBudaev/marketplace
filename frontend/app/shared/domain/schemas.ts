import { z } from "zod";

export const domainErrorSchema = z.object({
  path: z.string().array(),
  message: z.string(),
});

export const domainErrorsSchema = domainErrorSchema.array();
