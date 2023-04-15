import { fetchApi } from "~/shared/api/http.server";
import type { TProductsByCatalog, TProductsByCatalogSearchParams } from "~/shared/api/products";
import type { TApiFunction } from "~/shared/api/types";
import { EFormMethods } from "~/shared/form";

export const getProductsByCatalogApi: TApiFunction<
  TProductsByCatalogSearchParams,
  TProductsByCatalog
> = (request, { alias, params }) => {
  const encodeAndJoinPair = (pair: any) => pair.map(encodeURIComponent).join("=");
  const searchParams = params && Object.entries(params).map(encodeAndJoinPair).join("&");
  const url = `/api/v1/products/page/?catalog=${alias}${searchParams ? `&${searchParams}` : ""}`;
  // console.log("[url] ", url);

  return fetchApi<TProductsByCatalog>(request, url, {
    method: EFormMethods.Get,
  });
};
