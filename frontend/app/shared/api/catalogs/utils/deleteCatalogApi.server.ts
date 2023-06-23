import {fetchApi} from "~/shared/api";
import type {TApiFunction} from "~/shared/api";
import type {TCatalogDelete, TCatalogDeleteParams} from "~/shared/api/catalogs";
import {EFormMethods} from "~/shared/form";

export const deleteCatalogApi: TApiFunction<TCatalogDeleteParams, TCatalogDelete> = (
  request,
  params,
) => {
  const {alias} = params;
  const url = `/api/v1/catalogs/delete/${alias}`;

  return fetchApi<TCatalogDelete>(request, url, {
    method: EFormMethods.Delete,
  });
};
