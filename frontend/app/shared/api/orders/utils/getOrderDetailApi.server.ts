import { fetchApi } from "~/shared/api";
import type { TApiFunction } from "~/shared/api";
import type { TOrderDetail, TOrderDetailParams } from "app/shared/api/orders";
import { EFormMethods } from "~/shared/form";

export const getOrderDetailApi: TApiFunction<TOrderDetailParams, TOrderDetail> = (
  request,
  params,
) => {
  const { id } = params;
  const url = `/api/v1/orders/order/${id}`;

  return fetchApi<TOrderDetail>(request, url, {
    method: EFormMethods.Get,
  });
};
