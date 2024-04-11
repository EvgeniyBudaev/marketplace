import { fetchApi } from "#app/shared/api";
import type { TApiFunction } from "#app/shared/api";
import type { TUser, TUserDetailsParams } from "#app/shared/api/users/types";
import { EFormMethods } from "#app/shared/form";

export const getUserDetailsApi: TApiFunction<TUserDetailsParams, TUser> = (
  request,
  params
) => {
  return fetchApi<TUser>(request, `/api/v1/users/userinfo/${params.id}`, {
    method: EFormMethods.Get,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${params.access_token}`,
      Accept: "application/json",
    },
  });
};
