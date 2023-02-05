import { fetchApi } from "~/shared/api";
import type { TApiFunction } from "~/shared/api";
import type { TCatalogs, TCatalogsParams } from "~/shared/api/catalogs";
import { EFormMethods } from "~/shared/form";

export const getCatalogsApi: TApiFunction<TCatalogsParams, TCatalogs> = (request, params) => {
  const encodeAndJoinPair = (pair: any) => pair.map(encodeURIComponent).join("=");
  const searchParams = params && Object.entries(params).map(encodeAndJoinPair).join("&");
  const url = `/api/v1/catalogs/get_all?${searchParams ? `&${searchParams}` : ""}`;
  console.log("url: ", url);

  return fetchApi<TCatalogs>(request, url, {
    method: EFormMethods.Get,
  });
};
