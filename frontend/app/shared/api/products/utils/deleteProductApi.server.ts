import { fetchApi } from "#app/shared/api";
import type { TApiFunction } from "#app/shared/api";
import type {
  TProductDelete,
  TProductDeleteParams,
} from "#app/shared/api/products";
import { EFormMethods } from "#app/shared/form";

export const deleteProductApi: TApiFunction<
  TProductDeleteParams,
  TProductDelete
> = (request, params) => {
  const { alias } = params;
  const url = `/api/v1/products/delete/${alias}`;

  return fetchApi<TProductDelete>(request, url, {
    method: EFormMethods.Delete,
  });
};
