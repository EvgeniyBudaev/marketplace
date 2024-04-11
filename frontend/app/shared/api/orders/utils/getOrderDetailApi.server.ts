import { fetchApi } from "#app/shared/api";
import type { TApiFunction } from "#app/shared/api";
import type { TOrderDetail, TOrderDetailParams } from "app/shared/api/orders";
import { EFormMethods } from "#app/shared/form";

export const getOrderDetailApi: TApiFunction<
  TOrderDetailParams,
  TOrderDetail
> = (request, params) => {
  const { id } = params;
  const url = `/api/v1/orders/order/${id}`;

  return fetchApi<TOrderDetail>(request, url, {
    method: EFormMethods.Get,
  });
};
