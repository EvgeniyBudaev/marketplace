import { z } from "zod";

export const paymentVariantItemSchema = z.object({
  id: z.number(),
  name: z.string(),
});
