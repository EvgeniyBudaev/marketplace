import { fetchApi } from "~/shared/api";
import type { TApiFunction } from "~/shared/api";
import type { TLogin, TLoginParams } from "~/shared/api/auth";
import { EFormMethods } from "~/shared/form";

export const loginApi: TApiFunction<TLoginParams, TLogin> = (request, params) => {
  return fetchApi<TLogin>(request, `/api/v1/auth`, {
    method: EFormMethods.Post,
    body: params,
  });
};
