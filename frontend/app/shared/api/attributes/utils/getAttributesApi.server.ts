import { fetchApi } from "~/shared/api";
import type { TApiFunction } from "~/shared/api";
import type { TAttributes, TAttributesParams } from "~/shared/api/attributes";
import { EFormMethods } from "~/shared/form";

export const getAttributesApi: TApiFunction<TAttributesParams, TAttributes> = (
  request,
  { params },
) => {
  const url = `/api/v1/attributes/get_all?${new URLSearchParams(params)}`;
  console.log("[url] ", url);

  return fetchApi<TAttributes>(request, url, {
    method: EFormMethods.Get,
  });
};
