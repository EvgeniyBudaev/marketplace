import { fetchApi } from "#app/shared/api";
import type { TApiFunction } from "#app/shared/api";
import type { TProductAdd, TProductAddParams } from "#app/shared/api/products";
import { EFormMethods } from "#app/shared/form";

export const addProductApi: TApiFunction<TProductAddParams, TProductAdd> = (
  request,
  params
) => {
  const url = `/api/v1/products/save`;
  console.log("[addProduct url] ", url);
  return fetchApi<TProductAdd>(request, url, {
    method: EFormMethods.Post,
    body: params,
  });
};
