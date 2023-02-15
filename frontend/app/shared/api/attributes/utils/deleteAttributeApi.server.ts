import { fetchApi } from "~/shared/api";
import type { TApiFunction } from "~/shared/api";
import type { TAttributeDelete, TAttributeDeleteParams } from "~/shared/api/attributes";
import { EFormMethods } from "~/shared/form";

export const deleteAttributeApi: TApiFunction<TAttributeDeleteParams, TAttributeDelete> = (
  request,
  params,
) => {
  const { alias } = params;
  const url = `/api/v1/attributes/${alias}`;
  console.log("[utils delete params] ", params);
  return fetchApi<TAttributeDelete>(request, url, {
    method: EFormMethods.Delete,
  });
};
