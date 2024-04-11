import { fetchApi } from "#app/shared/api/http.server";
import type { TProducts, TProductsParams } from "#app/shared/api/products";
import type { TApiFunction } from "#app/shared/api/types";
import { EFormMethods } from "#app/shared/form";

export const getProductsApi: TApiFunction<TProductsParams, TProducts> = (
  request,
  { params }
) => {
  const url = `/api/v1/products/get_all?${new URLSearchParams(params)}`;
  // console.log("[url] ", url);

  return fetchApi<TProducts>(request, url, {
    method: EFormMethods.Get,
  });
};
