import type { z } from "zod";
import type { tableOrderListItemSchema } from "#app/pages/Admin/Orders/OrdersTable/schemas";
import type { TOrderListItem } from "#app/shared/api/orders";

export type TTableColumn = TOrderListItem;

export type TTableOrderListItem = z.infer<typeof tableOrderListItemSchema>;
