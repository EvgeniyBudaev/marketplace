import { fetchApi } from "#app/shared/api";
import type { TApiFunction } from "#app/shared/api";
import type { TCatalogs, TCatalogsParams } from "#app/shared/api/catalogs";
import { EFormMethods } from "#app/shared/form";

export const getCatalogsApi: TApiFunction<TCatalogsParams, TCatalogs> = (
  request,
  { params }
) => {
  const url = `/api/v1/catalogs/get_all?${new URLSearchParams(params)}`;

  return fetchApi<TCatalogs>(request, url, {
    method: EFormMethods.Get,
  });
};
