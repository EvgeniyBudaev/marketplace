import { fetchApi } from "~/shared/api/http.server";
import type { TProducts, TProductsParams } from "~/shared/api/products";
import type { TApiFunction } from "~/shared/api/types";
import { EFormMethods } from "~/shared/form";

export const getProductsApi: TApiFunction<TProductsParams, TProducts> = (request, { params }) => {
  const url = `/api/v1/products/get_all?${new URLSearchParams(params)}`;
  console.log("[url] ", url);

  return fetchApi<TProducts>(request, url, {
    method: EFormMethods.Get,
  });
};
