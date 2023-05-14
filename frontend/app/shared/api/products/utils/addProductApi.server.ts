import { fetchApi } from "~/shared/api";
import type { TApiFunction } from "~/shared/api";
import type { TProductAdd, TProductAddParams } from "~/shared/api/products";
import { EFormMethods } from "~/shared/form";

export const addProductApi: TApiFunction<TProductAddParams, TProductAdd> = (request, params) => {
  const url = `/api/v1/products/save`;
  console.log("url: ", url);
  return fetchApi<TProductAdd>(request, url, {
    method: EFormMethods.Post,
    body: params,
  });
};
