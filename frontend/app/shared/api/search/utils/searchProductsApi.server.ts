import { fetchApi } from "~/shared/api/http.server";
import type { TSearchProducts, TSearchProductsParams } from "~/shared/api/search/types";
import type { TApiFunction } from "~/shared/api/types";
import { EFormMethods } from "~/shared/form";

export const searchProductsApi: TApiFunction<TSearchProductsParams, TSearchProducts> = (
  request,
  { search },
) => {
  console.log("search", search);
  const url = `/api/v1/products/find?search=${search}`;

  return fetchApi<TSearchProducts>(request, url, {
    method: EFormMethods.Get,
  });
};
