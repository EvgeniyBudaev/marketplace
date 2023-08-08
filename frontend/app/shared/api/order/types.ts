import type { z } from "zod";
import type { orderSchema, orderParamsSchema } from "~/shared/api/order";

export type TOrder = z.infer<typeof orderSchema>;
export type TOrderParams = z.infer<typeof orderParamsSchema>;
