import { fetchApi } from "~/shared/api";
import type { TApiFunction } from "~/shared/api";
import { TCart, TCartItemSetQuantityParams } from "~/shared/api/cart";
import { EFormMethods } from "~/shared/form";

export const setQuantityCartItemApi: TApiFunction<TCartItemSetQuantityParams, TCart> = (
  request,
  params,
) => {
  const url = `/api/v1/cart/set_quantity`;
  return fetchApi<TCart>(request, url, {
    method: EFormMethods.Post,
    body: params,
  });
};
