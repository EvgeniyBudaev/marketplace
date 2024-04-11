import { fetchApi } from "#app/shared/api";
import type { TApiFunction } from "#app/shared/api";
import type {
  TProductDetail,
  TProductDetailParams,
} from "#app/shared/api/products";
import { EFormMethods } from "#app/shared/form";

export const getProductDetailApi: TApiFunction<
  TProductDetailParams,
  TProductDetail
> = (request, { alias }) => {
  const url = `/api/v1/products/by_alias?alias=${alias}`;
  return fetchApi<TProductDetail>(request, url, {
    method: EFormMethods.Get,
  });
};
