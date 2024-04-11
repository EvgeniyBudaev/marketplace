import { fetchApi } from "#app/shared/api";
import type { TApiFunction } from "#app/shared/api";
import type { TShipping, TShippingParams } from "#app/shared/api/shipping";
import { EFormMethods } from "#app/shared/form";

export const getShippingApi: TApiFunction<TShippingParams, TShipping> = (
  request,
  params
) => {
  const { uuid } = params;
  const url = `/api/v1/shipping/address/${uuid}`;

  return fetchApi<TShipping>(request, url, {
    method: EFormMethods.Get,
  });
};
