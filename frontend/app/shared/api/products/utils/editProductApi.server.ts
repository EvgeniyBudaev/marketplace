import { fetchApi } from "#app/shared/api";
import type { TApiFunction } from "#app/shared/api";
import type {
  TProductEdit,
  TProductEditParams,
} from "#app/shared/api/products";
import { EFormMethods } from "#app/shared/form";

export const editProductApi: TApiFunction<TProductEditParams, TProductEdit> = (
  request,
  params
) => {
  const url = `/api/v1/products/put`;
  console.log("[utils edit params] ", params);
  return fetchApi<TProductEdit>(request, url, {
    method: EFormMethods.Put,
    body: params,
  });
};
