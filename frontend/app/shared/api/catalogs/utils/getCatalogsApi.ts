import { fetchApi } from "~/shared/api";
import type { TApiFunction } from "~/shared/api";
import type { TCatalogs, TCatalogsParams } from "~/shared/api/catalogs";
import { EFormMethods } from "~/shared/form";

export const getCatalogsApi: TApiFunction<TCatalogsParams, TCatalogs> = (request) => {
  return fetchApi<TCatalogs>(request, `/api/v1/catalogs/page`, {
    method: EFormMethods.Get,
  });
};
