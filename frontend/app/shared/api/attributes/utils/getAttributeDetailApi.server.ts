import { fetchApi } from "#app/shared/api";
import type { TApiFunction } from "#app/shared/api";
import {
  TAttributeDetail,
  TAttributeDetailParams,
} from "#app/shared/api/attributes";
import { EFormMethods } from "#app/shared/form";

export const getAttributeDetailApi: TApiFunction<
  TAttributeDetailParams,
  TAttributeDetail
> = (request, params) => {
  const { alias } = params;
  const url = `/api/v1/attributes/by_alias/${alias}`;
  return fetchApi<TAttributeDetail>(request, url, {
    method: EFormMethods.Get,
  });
};
