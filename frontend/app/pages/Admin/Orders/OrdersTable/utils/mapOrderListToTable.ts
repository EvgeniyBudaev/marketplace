import type { TTableOrderListItem } from "#app/pages/Admin/Orders/OrdersTable/types";
import type { TOrderListItem } from "#app/shared/api/orders";

export const mapOrderListToTable = (
  content?: TOrderListItem[] | null
): TTableOrderListItem[] => {
  return (content ?? []).map((order) => ({
    createdAt: order.createdAt,
    id: order.id,
    modifyDate: order.modifyDate,
    orderAmount: order.orderAmount,
    recipientEmail: order.recipient?.email,
    recipientName: order.recipient?.name,
    recipientPhone: order.recipient?.phone,
    recipientSurname: order.recipient?.surname,
    status: order.status,
  }));
};
