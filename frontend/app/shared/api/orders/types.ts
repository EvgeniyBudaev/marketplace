import type { z } from "zod";
import type {
  orderSchema,
  orderParamsSchema,
  orderListItemSchema,
  orderListParamsSchema,
  orderListSchema,
  orderDetailParamsSchema,
  orderDetailSchema,
  orderDetailListItemSchema,
  orderEditParamsSchema,
  orderEditSchema,
} from "app/shared/api/orders";

export type TOrder = z.infer<typeof orderSchema>;
export type TOrderParams = z.infer<typeof orderParamsSchema>;

export type TOrderList = z.infer<typeof orderListSchema>;
export type TOrderListItem = z.infer<typeof orderListItemSchema>;
export type TOrderListParams = z.infer<typeof orderListParamsSchema>;

export type TOrderDetail = z.infer<typeof orderDetailSchema>;
export type TOrderDetailListItem = z.infer<typeof orderDetailListItemSchema>;
export type TOrderDetailParams = z.infer<typeof orderDetailParamsSchema>;

export type TOrderEdit = z.infer<typeof orderEditSchema>;
export type TOrderEditParams = z.infer<typeof orderEditParamsSchema>;
