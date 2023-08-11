import {
  orderDetailParamsSchema,
  orderDetailSchema,
  orderListParamsSchema,
  orderListSchema,
  orderParamsSchema,
  orderSchema,
} from "~/shared/api/orders/schemas";
import { createOrderApi, getOrderDetailApi, getOrderListApi } from "~/shared/api/orders/utils";
import { apiDomainFunction } from "~/utils";

export const createOrder = apiDomainFunction(orderParamsSchema, orderSchema)(createOrderApi);

export const getOrderList = apiDomainFunction(
  orderListParamsSchema,
  orderListSchema,
)(getOrderListApi);

export const getOrderDetail = apiDomainFunction(
  orderDetailParamsSchema,
  orderDetailSchema,
)(getOrderDetailApi);
