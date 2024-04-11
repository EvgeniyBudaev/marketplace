import { fetchApi } from "#app/shared/api";
import type { TApiFunction } from "#app/shared/api";
import type { TOrderEdit, TOrderEditParams } from "#app/shared/api/orders";
import { EFormMethods } from "#app/shared/form";

export const editOrderApi: TApiFunction<TOrderEditParams, TOrderEdit> = (
  request,
  params
) => {
  const url = `/api/v1/orders/patch`;

  return fetchApi<TOrderEdit>(request, url, {
    method: EFormMethods.Patch,
    body: params,
  });
};
