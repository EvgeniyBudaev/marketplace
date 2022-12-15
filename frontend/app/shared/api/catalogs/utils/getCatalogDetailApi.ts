import { TCatalogDetail, TCatalogDetailParams } from "~/shared/api/catalogs";
import { fetchApi, TApiFunction } from "~/shared/api";
import { EFormMethods } from "~/shared/form";

export const getCatalogDetailApi: TApiFunction<TCatalogDetailParams, TCatalogDetail> = (
  request,
  params,
) => {
  const { alias } = params;
  return fetchApi<TCatalogDetail>(request, `/api/v1/catalogs/by_alias/${alias}`, {
    method: EFormMethods.Get,
  });
};
