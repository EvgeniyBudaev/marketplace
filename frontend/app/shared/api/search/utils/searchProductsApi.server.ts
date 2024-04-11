import { fetchApi } from "#app/shared/api/http.server";
import type {
  TSearchProducts,
  TSearchProductsParams,
} from "#app/shared/api/search/types";
import type { TApiFunction } from "#app/shared/api/types";
import { EFormMethods } from "#app/shared/form";

export const searchProductsApi: TApiFunction<
  TSearchProductsParams,
  TSearchProducts
> = (request, { search }) => {
  console.log("search", search);
  const url = `/api/v1/products/find?search=${search}`;

  return fetchApi<TSearchProducts>(request, url, {
    method: EFormMethods.Get,
  });
};
