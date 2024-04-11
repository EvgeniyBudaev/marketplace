import { fetchApi } from "#app/shared/api";
import type { TApiFunction } from "#app/shared/api";
import type {
  TCatalogDetail,
  TCatalogDetailParams,
} from "#app/shared/api/catalogs";
import { EFormMethods } from "#app/shared/form";

export const getCatalogDetailApi: TApiFunction<
  TCatalogDetailParams,
  TCatalogDetail
> = (request, params) => {
  const { alias } = params;
  return fetchApi<TCatalogDetail>(
    request,
    `/api/v1/catalogs/by_alias/${alias}`,
    {
      method: EFormMethods.Get,
    }
  );
};
