import { fetchApi } from "~/shared/api";
import type { TApiFunction } from "~/shared/api";
import type { TCatalogAdd, TCatalogAddParams } from "~/shared/api/catalogs";
import { EFormMethods } from "~/shared/form";

export const addCatalogApi: TApiFunction<TCatalogAddParams, TCatalogAdd> = (request) => {
  return fetchApi<TCatalogAdd>(request, `/api/v1/catalogs`, {
    method: EFormMethods.Post,
  });
};
