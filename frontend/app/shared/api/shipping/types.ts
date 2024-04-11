import type { z } from "zod";
import type {
  shippingSchema,
  shippingParamsSchema,
  shippingEditParamsSchema,
} from "#app/shared/api/shipping";

export type TShipping = z.infer<typeof shippingSchema>;
export type TShippingParams = z.infer<typeof shippingParamsSchema>;
export type TShippingEditParams = z.infer<typeof shippingEditParamsSchema>;
