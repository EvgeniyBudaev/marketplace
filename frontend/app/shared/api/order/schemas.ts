import { z } from "zod";

export const orderParamsSchema = z.object({
  payment: z.string(),
  session: z.string(),
});

export const orderSchema = z.any();
