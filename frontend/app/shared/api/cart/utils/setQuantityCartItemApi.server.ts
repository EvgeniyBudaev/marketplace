import { fetchApi } from "#app/shared/api";
import type { TApiFunction } from "#app/shared/api";
import { TCart, TCartItemSetQuantityParams } from "#app/shared/api/cart";
import { EFormMethods } from "#app/shared/form";

export const setQuantityCartItemApi: TApiFunction<
  TCartItemSetQuantityParams,
  TCart
> = (request, params) => {
  const url = `/api/v1/cart/set_quantity`;
  return fetchApi<TCart>(request, url, {
    method: EFormMethods.Post,
    body: params,
  });
};
