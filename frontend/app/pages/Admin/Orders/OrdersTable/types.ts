import type { z } from "zod";
import type { tableOrderListItemSchema } from "~/pages/Admin/Orders/OrdersTable/schemas";
import type { TOrderListItem } from "~/shared/api/orders";

export type TTableColumn = TOrderListItem;

export type TTableOrderListItem = z.infer<typeof tableOrderListItemSchema>;
