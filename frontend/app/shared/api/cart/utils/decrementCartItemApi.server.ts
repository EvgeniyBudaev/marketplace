import { fetchApi } from "~/shared/api";
import type { TApiFunction } from "~/shared/api";
import { TCart, TCartItemDecrementParams } from "~/shared/api/cart";
import { EFormMethods } from "~/shared/form";

export const decrementCartItemApi: TApiFunction<TCartItemDecrementParams, TCart> = (
  request,
  params,
) => {
  const url = `/api/v1/cart/decrement`;
  return fetchApi<TCart>(request, url, {
    method: EFormMethods.Post,
    body: params,
  });
};
