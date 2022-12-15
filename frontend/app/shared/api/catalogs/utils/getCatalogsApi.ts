import { TCatalogs, TCatalogsParams } from "~/shared/api/catalogs";
import { fetchApi, TApiFunction } from "~/shared/api";
import { EFormMethods } from "~/shared/form";

export const getCatalogsApi: TApiFunction<TCatalogsParams, TCatalogs> = (request) => {
  return fetchApi<TCatalogs>(request, `/api/v1/catalogs/page`, {
    method: EFormMethods.Get,
  });
};
