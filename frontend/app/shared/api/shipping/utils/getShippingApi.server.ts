import { fetchApi } from "~/shared/api";
import type { TApiFunction } from "~/shared/api";
import type { TShipping, TShippingParams } from "~/shared/api/shipping";
import { EFormMethods } from "~/shared/form";

export const getShippingApi: TApiFunction<TShippingParams, TShipping> = (request, params) => {
  const { uuid } = params;
  const url = `/api/v1/shipping/address/${uuid}`;

  return fetchApi<TShipping>(request, url, {
    method: EFormMethods.Get,
  });
};
