import {fetchApi} from "~/shared/api";
import type {TApiFunction} from "~/shared/api";
import type {TSelectableValueDelete, TSelectableValueDeleteParams} from "~/shared/api/attributes";
import {EFormMethods} from "~/shared/form";

export const deleteSelectableValueApi: TApiFunction<
  TSelectableValueDeleteParams,
  TSelectableValueDelete
> = (request, params) => {
  const {id} = params;
  const url = `/api/v1/attributes/values/selectable/${id}`;

  return fetchApi<TSelectableValueDelete>(request, url, {
    method: EFormMethods.Delete,
  });
};
