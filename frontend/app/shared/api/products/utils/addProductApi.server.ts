import { fetchApi } from "~/shared/api";
import type { TApiFunction } from "~/shared/api";
import type { TProductAdd, TProductAddParams } from "~/shared/api/products";
import { EFormMethods } from "~/shared/form";

export const addProductApi: TApiFunction<TProductAddParams, TProductAdd> = (request) => {
  return fetchApi<TProductAdd>(request, `/api/v1/products`, {
    method: EFormMethods.Post,
  });
};
