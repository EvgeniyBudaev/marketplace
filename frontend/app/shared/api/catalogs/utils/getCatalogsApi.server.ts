import { fetchApi } from "~/shared/api";
import type { TApiFunction } from "~/shared/api";
import type { TCatalogs, TCatalogsParams } from "~/shared/api/catalogs";
import { EFormMethods } from "~/shared/form";

export const getCatalogsApi: TApiFunction<TCatalogsParams, TCatalogs> = (request, { params }) => {
  const url = `/api/v1/catalogs/get_all?${new URLSearchParams(params)}`;
  // console.log("url: ", url);

  return fetchApi<TCatalogs>(request, url, {
    method: EFormMethods.Get,
  });
};
