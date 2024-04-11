import { fetchApi } from "#app/shared/api";
import type { TApiFunction } from "#app/shared/api";
import type {
  TAttributeDelete,
  TAttributeDeleteParams,
} from "#app/shared/api/attributes";
import { EFormMethods } from "#app/shared/form";

export const deleteAttributeApi: TApiFunction<
  TAttributeDeleteParams,
  TAttributeDelete
> = (request, params) => {
  const { alias } = params;
  const url = `/api/v1/attributes/delete/${alias}`;

  return fetchApi<TAttributeDelete>(request, url, {
    method: EFormMethods.Delete,
  });
};
