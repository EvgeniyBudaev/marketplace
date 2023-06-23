import {fetchApi} from "~/shared/api";
import type {TApiFunction} from "~/shared/api";
import type {TSelectableValueAdd, TSelectableValueAddParams} from "~/shared/api/attributes";
import {EFormMethods} from "~/shared/form";

export const addSelectableValueApi: TApiFunction<TSelectableValueAddParams, TSelectableValueAdd> = (
  request,
  params,
) => {
  const url = `/api/v1/attributes/values/selectable`;
  return fetchApi<TSelectableValueAdd>(request, url, {
    method: EFormMethods.Post,
    body: params,
  });
};
