import { fetchApi } from "#app/shared/api";
import type { TApiFunction } from "#app/shared/api";
import type {
  TAttributeEdit,
  TAttributeEditParams,
} from "#app/shared/api/attributes";
import { EFormMethods } from "#app/shared/form";

export const editAttributeApi: TApiFunction<
  TAttributeEditParams,
  TAttributeEdit
> = (request, params) => {
  const url = `/api/v1/attributes/put`;

  return fetchApi<TAttributeEdit>(request, url, {
    method: EFormMethods.Put,
    body: params,
  });
};
