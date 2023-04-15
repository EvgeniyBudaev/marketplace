import { fetchApi } from "~/shared/api";
import type { TApiFunction } from "~/shared/api";
import type { TAttributesByCatalog, TAttributesByCatalogParams } from "~/shared/api/attributes";
import { EFormMethods } from "~/shared/form";

export const getAttributesByCatalogApi: TApiFunction<
  TAttributesByCatalogParams,
  TAttributesByCatalog
> = (request, params) => {
  const { alias } = params;
  const url = `/api/v1/admin/catalogs/attributes/${alias}`;
  // console.log("[url] ", url);

  return fetchApi<TAttributesByCatalog>(request, url, {
    method: EFormMethods.Get,
  });
};
