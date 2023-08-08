import { orderParamsSchema, orderSchema } from "~/shared/api/order/schemas";
import { createOrderApi } from "~/shared/api/order/utils";
import { apiDomainFunction } from "~/utils";

export const createOrder = apiDomainFunction(orderParamsSchema, orderSchema)(createOrderApi);
