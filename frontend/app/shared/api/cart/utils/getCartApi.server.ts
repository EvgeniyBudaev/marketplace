import { fetchApi } from "~/shared/api";
import type { TApiFunction } from "~/shared/api";
import { TCart, TCartParams } from "~/shared/api/cart";
import { EFormMethods } from "~/shared/form";

export const getCartApi: TApiFunction<TCartParams, TCart> = (request, params) => {
  const url = `/api/v1/cart`;
  return fetchApi<TCart>(request, url, {
    method: EFormMethods.Post,
    body: params,
  });
};
