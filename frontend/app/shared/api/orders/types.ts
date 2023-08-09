import type { z } from "zod";
import type {
  orderSchema,
  orderParamsSchema,
  orderListItemSchema,
  orderListParamsSchema,
  orderListSchema,
} from "app/shared/api/orders";

export type TOrder = z.infer<typeof orderSchema>;
export type TOrderParams = z.infer<typeof orderParamsSchema>;

export type TOrderList = z.infer<typeof orderListSchema>;
export type TOrderListItem = z.infer<typeof orderListItemSchema>;
export type TOrderListParams = z.infer<typeof orderListParamsSchema>;
