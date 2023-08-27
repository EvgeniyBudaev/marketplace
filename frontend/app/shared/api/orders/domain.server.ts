import {
  orderDetailParamsSchema,
  orderDetailSchema,
  orderEditParamsSchema,
  orderEditSchema,
  orderListParamsSchema,
  orderListSchema,
  orderParamsSchema,
  orderSchema,
} from "~/shared/api/orders/schemas";
import {
  createOrderApi,
  editOrderApi,
  getOrderDetailApi,
  getOrderListApi,
} from "~/shared/api/orders/utils";
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

export const editOrder = apiDomainFunction(orderEditParamsSchema, orderEditSchema)(editOrderApi);
