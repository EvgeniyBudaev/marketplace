import { fetchApi } from "~/shared/api";
import type { TApiFunction } from "~/shared/api";
import type { TSelectableValueEdit, TSelectableValueEditParams } from "~/shared/api/attributes";
import { EFormMethods } from "~/shared/form";

export const editSelectableValueApi: TApiFunction<
  TSelectableValueEditParams,
  TSelectableValueEdit
> = (request, params) => {
  const url = `/api/v1/attributes/values/selectable`;
  console.log("[put value params] ", params);
  return fetchApi<TSelectableValueEdit>(request, url, {
    method: EFormMethods.Patch,
    body: params,
  });
};
