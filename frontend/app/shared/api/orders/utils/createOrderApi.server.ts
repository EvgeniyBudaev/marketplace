import { fetchApi } from "#app/shared/api";
import type { TApiFunction } from "#app/shared/api";
import type { TOrder, TOrderParams } from "app/shared/api/orders";
import { EFormMethods } from "#app/shared/form";

export const createOrderApi: TApiFunction<TOrderParams, TOrder> = (
  request,
  params
) => {
  const url = `/api/v1/orders/create`;

  return fetchApi<TOrder>(request, url, {
    method: EFormMethods.Post,
    body: params,
  });
};
