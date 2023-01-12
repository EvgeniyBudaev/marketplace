import { fetchApi } from "~/shared/api";
import type { TApiFunction } from "~/shared/api";
import { TCart, TCartItemIncrementParams } from "~/shared/api/cart";
import { EFormMethods } from "~/shared/form";

export const incrementCartItemApi: TApiFunction<TCartItemIncrementParams, TCart> = (
  request,
  params,
) => {
  const url = `/api/v1/cart/add`;
  return fetchApi<TCart>(request, url, {
    method: EFormMethods.Post,
    body: params,
  });
};
