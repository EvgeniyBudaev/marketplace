import isNil from "lodash/isNil";
import { fetchApi } from "#app/shared/api";
import type { TApiFunction } from "#app/shared/api";
import type { TOrderList, TOrderListParams } from "app/shared/api/orders";
import { EFormMethods } from "#app/shared/form";

export const getOrderListApi: TApiFunction<TOrderListParams, TOrderList> = (
  request,
  params
) => {
  const searchParams = {
    page: params.page,
    size: params.size,
    ...(!isNil(params.statuses) && { statuses: params.statuses }),
  };
  const url = `/api/v1/orders/all?${new URLSearchParams(searchParams)}`;
  console.log("[getOrderListApi url] ", url);
  return fetchApi<TOrderList>(request, url, {
    method: EFormMethods.Get,
  });
};
