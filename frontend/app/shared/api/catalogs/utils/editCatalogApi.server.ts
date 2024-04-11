import { fetchApi } from "#app/shared/api";
import type { TApiFunction } from "#app/shared/api";
import type {
  TCatalogEdit,
  TCatalogEditParams,
} from "#app/shared/api/catalogs";
import { EFormMethods } from "#app/shared/form";

export const editCatalogApi: TApiFunction<TCatalogEditParams, TCatalogEdit> = (
  request,
  params
) => {
  const url = `/api/v1/catalogs/put`;
  return fetchApi<TCatalogEdit>(request, url, {
    method: EFormMethods.Put,
    body: params,
  });
};
