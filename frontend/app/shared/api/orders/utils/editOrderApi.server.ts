import { fetchApi } from "~/shared/api";
import type { TApiFunction } from "~/shared/api";
import type { TOrderEdit, TOrderEditParams } from "~/shared/api/orders";
import { EFormMethods } from "~/shared/form";

export const editOrderApi: TApiFunction<TOrderEditParams, TOrderEdit> = (request, params) => {
  const url = `/api/v1/orders/patch`;

  return fetchApi<TOrderEdit>(request, url, {
    method: EFormMethods.Patch,
    body: params,
  });
};
