import { z } from "zod";

export const settingsParamsSchema = z.object({
  uuid: z.string(),
});

export const settingsSchema = z.object({
  currency: z.string(),
  language: z.string(),
  theme: z.string(),
  uuid: z.string(),
});
