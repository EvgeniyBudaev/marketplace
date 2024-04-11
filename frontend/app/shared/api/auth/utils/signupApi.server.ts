import { fetchApi } from "#app/shared/api";
import type { TApiFunction } from "#app/shared/api";
import type { TSignup, TSignupParams } from "#app/shared/api/auth";
import { EFormMethods } from "#app/shared/form";

export const signupApi: TApiFunction<TSignupParams, TSignup> = (
  request,
  params
) => {
  return fetchApi<TSignup>(request, `/api/v1/users/register`, {
    method: EFormMethods.Post,
    body: params,
  });
};
