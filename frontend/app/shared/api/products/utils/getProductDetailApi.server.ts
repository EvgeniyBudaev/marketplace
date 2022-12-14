import { fetchApi } from "~/shared/api";
import type { TApiFunction } from "~/shared/api";
import type { TProductDetail, TProductDetailParams } from "~/shared/api/products";
import { EFormMethods } from "~/shared/form";

export const getProductDetailApi: TApiFunction<TProductDetailParams, TProductDetail> = (
  request,
  { alias },
) => {
  const url = `/api/v1/products/by_alias?alias=${alias}`;
  return fetchApi<TProductDetail>(request, url, {
    method: EFormMethods.Get,
  });
};
