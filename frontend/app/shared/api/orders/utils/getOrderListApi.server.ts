import { fetchApi } from "~/shared/api";
import type { TApiFunction } from "~/shared/api";
import type { TOrderList, TOrderListParams } from "app/shared/api/orders";
import { EFormMethods } from "~/shared/form";

export const getOrderListApi: TApiFunction<TOrderListParams, TOrderList> = (request, params) => {
  const url = `/api/v1/orders/all`;
  console.log("[params] ", params);
  return fetchApi<TOrderList>(request, url, {
    method: EFormMethods.Get,
    body: params,
  });
};
