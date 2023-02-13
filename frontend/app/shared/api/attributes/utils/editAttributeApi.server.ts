import { fetchApi } from "~/shared/api";
import type { TApiFunction } from "~/shared/api";
import type { TAttributeEdit, TAttributeEditParams } from "~/shared/api/attributes";
import { EFormMethods } from "~/shared/form";

export const editAttributeApi: TApiFunction<TAttributeEditParams, TAttributeEdit> = (
  request,
  params,
) => {
  const url = `/api/v1/attributes/put`;
  console.log("[put utils params] ", params);
  return fetchApi<TAttributeEdit>(request, url, {
    method: EFormMethods.Put,
    body: params,
  });
};
