import { fetchApi } from "#app/shared/api";
import type { TApiFunction } from "#app/shared/api";
import { TCart, TCartItemDecrementParams } from "#app/shared/api/cart";
import { EFormMethods } from "#app/shared/form";

export const decrementCartItemApi: TApiFunction<
  TCartItemDecrementParams,
  TCart
> = (request, params) => {
  const url = `/api/v1/cart/decrement`;
  return fetchApi<TCart>(request, url, {
    method: EFormMethods.Post,
    body: params,
  });
};
