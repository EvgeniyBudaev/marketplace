import { fetchApi } from "~/shared/api";
import type { TApiFunction } from "~/shared/api";
import type { TAdminProductDetail, TAdminProductDetailParams } from "~/shared/api/products";
import { EFormMethods } from "~/shared/form";

export const getAdminProductDetailApi: TApiFunction<
  TAdminProductDetailParams,
  TAdminProductDetail
> = (request, { alias }) => {
  const url = `/api/v1/products/admin/by_alias?alias=${alias}`;
  return fetchApi<TAdminProductDetail>(request, url, {
    method: EFormMethods.Get,
  });
};
