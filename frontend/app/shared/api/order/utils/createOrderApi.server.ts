import { fetchApi } from "~/shared/api";
import type { TApiFunction } from "~/shared/api";
import type { TOrder, TOrderParams } from "~/shared/api/order";
import { EFormMethods } from "~/shared/form";

export const createOrderApi: TApiFunction<TOrderParams, TOrder> = (request, params) => {
  const url = `/api/v1/orders/create`;
  console.log("[params] ", params);
  return fetchApi<TOrder>(request, url, {
    method: EFormMethods.Post,
    body: params,
  });
};
