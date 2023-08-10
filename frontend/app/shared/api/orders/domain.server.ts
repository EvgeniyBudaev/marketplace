import {
  orderListParamsSchema,
  orderListSchema,
  orderParamsSchema,
  orderSchema,
} from "~/shared/api/orders/schemas";
import { createOrderApi, getOrderListApi } from "~/shared/api/orders/utils";
import { apiDomainFunction } from "~/utils";

export const createOrder = apiDomainFunction(orderParamsSchema, orderSchema)(createOrderApi);

export const getOrderList = apiDomainFunction(
  orderListParamsSchema,
  orderListSchema,
)(getOrderListApi);
