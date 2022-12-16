import { TProducts, TProductsByCatalogSearchParams } from "~/shared/api/products";
import { fetchApi } from "~/shared/api/http.server";
import { TApiFunction } from "~/shared/api/types";
import { EFormMethods } from "~/shared/form";

export const getProductsByCatalogApi: TApiFunction<TProductsByCatalogSearchParams, TProducts> = (
  request,
  { alias, params },
) => {
  const encodeAndJoinPair = (pair: any) => pair.map(encodeURIComponent).join("=");
  const searchParams = params && Object.entries(params).map(encodeAndJoinPair).join("&");
  console.log("searchParams: ", searchParams);
  const url = `/api/v1/products/page/?catalog=${alias}${searchParams ? `&${searchParams}` : ""}`;
  console.log("[url] ", url);

  return fetchApi<TProducts>(request, url, {
    method: EFormMethods.Get,
  });
};
