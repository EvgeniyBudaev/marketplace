import { z } from "zod";

export const recipientSchema = z.object({
  email: z.string().nullish(),
  modifyDate: z.string().nullish(),
  name: z.string().nullish(),
  phone: z.string().nullish(),
  surname: z.string().nullish(),
});

export const recipientEditParamsSchema = z.object({
  email: z.string().nullish(),
  name: z.string().nullish(),
  phone: z.string().nullish(),
  surname: z.string().nullish(),
  uuid: z.string(),
});

export const recipientParamsSchema = z.object({
  uuid: z.string(),
});
