import { fetchApi } from "~/shared/api";
import type { TApiFunction } from "~/shared/api";
import type { TShipping, TShippingEditParams } from "~/shared/api/shipping";
import { EFormMethods } from "~/shared/form";

export const editShippingApi: TApiFunction<TShippingEditParams, TShipping> = (request, params) => {
  const url = `/api/v1/shipping/address`;

  return fetchApi<TShipping>(request, url, {
    method: EFormMethods.Patch,
    body: params,
  });
};
