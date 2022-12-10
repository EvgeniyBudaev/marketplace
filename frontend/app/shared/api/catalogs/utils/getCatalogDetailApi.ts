import { TCatalogDetail, TCatalogDetailRequest } from "~/shared/api/catalogs";
import { fetchApi, TApiFunction } from "~/shared/api";

export const getCatalogDetailApi: TApiFunction<TCatalogDetailRequest, TCatalogDetail> = (
  request,
  params,
) => {
  const { alias } = params;
  return fetchApi<TCatalogDetail>(request, `/api/v1/catalogs/by_alias/${alias}`, {
    method: "GET",
  });
};
