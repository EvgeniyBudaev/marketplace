import { fetchApi } from "#app/shared/api";
import type { TApiFunction } from "#app/shared/api";
import type { TLogin, TLoginParams } from "#app/shared/api/auth";
import { EFormMethods } from "#app/shared/form";

export const loginApi: TApiFunction<TLoginParams, TLogin> = (
  request,
  params
) => {
  return fetchApi<TLogin>(request, `/api/v1/auth`, {
    method: EFormMethods.Post,
    body: params,
  });
};
