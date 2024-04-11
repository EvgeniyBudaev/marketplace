import { fetchApi } from "#app/shared/api";
import type { TApiFunction } from "#app/shared/api";
import type { TCatalogAdd, TCatalogAddParams } from "#app/shared/api/catalogs";
import { EFormMethods } from "#app/shared/form";

export const addCatalogApi: TApiFunction<TCatalogAddParams, TCatalogAdd> = (
  request,
  params
) => {
  const url = `/api/v1/catalogs/save`;
  console.log("[url] ", url);
  return fetchApi<TCatalogAdd>(request, url, {
    method: EFormMethods.Post,
    body: params,
  });
};
