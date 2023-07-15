import {fetchApi} from "~/shared/api";
import type {TApiFunction} from "~/shared/api";
import type {TAttributeAdd, TAttributeAddParams} from "~/shared/api/attributes";
import {EFormMethods} from "~/shared/form";

export const addAttributeApi: TApiFunction<TAttributeAddParams, TAttributeAdd> = (
  request,
  params,
) => {
  const url = `/api/v1/attributes/save`;
  console.log("[url params] ", params);
  return fetchApi<TAttributeAdd>(request, url, {
    method: EFormMethods.Post,
    body: params,
  });
};
