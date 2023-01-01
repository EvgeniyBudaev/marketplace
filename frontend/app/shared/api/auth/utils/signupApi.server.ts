import { fetchApi } from "~/shared/api";
import type { TApiFunction } from "~/shared/api";
import type { TSignup, TSignupParams } from "~/shared/api/auth";
import { EFormMethods } from "~/shared/form";

export const signupApi: TApiFunction<TSignupParams, TSignup> = (request, params) => {
  return fetchApi<TSignup>(request, `/api/v1/users/register`, {
    method: EFormMethods.Post,
    body: params,
  });
};
