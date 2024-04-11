import { fetchApi } from "#app/shared/api";
import type { TApiFunction } from "#app/shared/api";
import type {
  TAttributes,
  TAttributesParams,
} from "#app/shared/api/attributes";
import { EFormMethods } from "#app/shared/form";

export const getAttributesApi: TApiFunction<TAttributesParams, TAttributes> = (
  request,
  { params }
) => {
  const url = `/api/v1/attributes/get_all?${new URLSearchParams(params)}`;
  // console.log("[url] ", url);

  return fetchApi<TAttributes>(request, url, {
    method: EFormMethods.Get,
  });
};
