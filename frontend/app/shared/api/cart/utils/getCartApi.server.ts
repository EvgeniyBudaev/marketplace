import { fetchApi } from "#app/shared/api";
import type { TApiFunction } from "#app/shared/api";
import type { TCart, TCartParams } from "#app/shared/api/cart";
import { EFormMethods } from "#app/shared/form";

export const getCartApi: TApiFunction<TCartParams, TCart> = (
  request,
  params
) => {
  const url = `/api/v1/cart`;

  return fetchApi<TCart>(request, url, {
    method: EFormMethods.Post,
    body: params,
  });
};
