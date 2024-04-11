import { fetchApi } from "#app/shared/api";
import type { TApiFunction } from "#app/shared/api";
import type { TShipping, TShippingEditParams } from "#app/shared/api/shipping";
import { EFormMethods } from "#app/shared/form";

export const editShippingApi: TApiFunction<TShippingEditParams, TShipping> = (
  request,
  params
) => {
  const url = `/api/v1/shipping/address`;

  return fetchApi<TShipping>(request, url, {
    method: EFormMethods.Patch,
    body: params,
  });
};
