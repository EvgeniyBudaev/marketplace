import { fetchApi } from "#app/shared/api";
import type { TApiFunction } from "#app/shared/api";
import { TCart, TCartItemIncrementParams } from "#app/shared/api/cart";
import { EFormMethods } from "#app/shared/form";

export const incrementCartItemApi: TApiFunction<
  TCartItemIncrementParams,
  TCart
> = (request, params) => {
  const url = `/api/v1/cart/add`;
  return fetchApi<TCart>(request, url, {
    method: EFormMethods.Post,
    body: params,
  });
};
