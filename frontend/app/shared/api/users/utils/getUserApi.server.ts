import { fetchApi } from "#app/shared/api";
import type { TApiFunction } from "#app/shared/api";
import type { TUser, TUserParams } from "#app/shared/api/users/types";
import { EFormMethods } from "#app/shared/form";

export const getUserApi: TApiFunction<TUserParams, TUser> = (
  request,
  params
) => {
  return fetchApi<TUser>(request, `/api/v1/users/me`, {
    method: EFormMethods.Get,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${params.access_token}`,
      Accept: "application/json",
    },
  });
};
