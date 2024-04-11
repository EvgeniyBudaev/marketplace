import { fetchApi } from "#app/shared/api";
import type { TApiFunction } from "#app/shared/api";
import { TCart, TCartItemRemoveParams } from "#app/shared/api/cart";
import { EFormMethods } from "#app/shared/form";

export const removeCartItemApi: TApiFunction<TCartItemRemoveParams, TCart> = (
  request,
  params
) => {
  const url = `/api/v1/cart/remove`;
  return fetchApi<TCart>(request, url, {
    method: EFormMethods.Post,
    body: params,
  });
};
