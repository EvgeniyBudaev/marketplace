import { fetchApi } from "~/shared/api";
import type { TApiFunction } from "~/shared/api";
import type { TCatalogAdd, TCatalogAddParams } from "~/shared/api/catalogs";
import { EFormMethods } from "~/shared/form";

export const addCatalogApi: TApiFunction<TCatalogAddParams, TCatalogAdd> = (request, params) => {
  const url = `/api/v1/catalogs/save`;
  console.log("[url] ", url);
  return fetchApi<TCatalogAdd>(request, url, {
    method: EFormMethods.Post,
    body: params,
  });
};
