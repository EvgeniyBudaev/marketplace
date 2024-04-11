import { fetchApi } from "#app/shared/api";
import type { TApiFunction } from "#app/shared/api";
import type {
  TAdminProductDetail,
  TAdminProductDetailParams,
} from "#app/shared/api/products";
import { EFormMethods } from "#app/shared/form";

export const getAdminProductDetailApi: TApiFunction<
  TAdminProductDetailParams,
  TAdminProductDetail
> = (request, { alias }) => {
  const url = `/api/v1/products/admin/by_alias?alias=${alias}`;
  return fetchApi<TAdminProductDetail>(request, url, {
    method: EFormMethods.Get,
  });
};
