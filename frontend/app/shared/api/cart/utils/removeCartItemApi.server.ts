import { fetchApi } from "~/shared/api";
import type { TApiFunction } from "~/shared/api";
import { TCart, TCartItemRemoveParams } from "~/shared/api/cart";
import { EFormMethods } from "~/shared/form";

export const removeCartItemApi: TApiFunction<TCartItemRemoveParams, TCart> = (request, params) => {
  const url = `/api/v1/cart/remove`;
  return fetchApi<TCart>(request, url, {
    method: EFormMethods.Post,
    body: params,
  });
};
