import { fetchApi } from "~/shared/api";
import type { TApiFunction } from "~/shared/api";
import type { TCatalogEdit, TCatalogEditParams } from "~/shared/api/catalogs";
import { EFormMethods } from "~/shared/form";

export const editCatalogApi: TApiFunction<TCatalogEditParams, TCatalogEdit> = (request, params) => {
  const url = `/api/v1/catalogs/put`;
  return fetchApi<TCatalogEdit>(request, url, {
    method: EFormMethods.Put,
    body: params,
  });
};
