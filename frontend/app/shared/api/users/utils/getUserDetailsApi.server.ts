import { fetchApi } from "~/shared/api";
import type { TApiFunction } from "~/shared/api";
import type { TUser, TUserDetailsParams } from "~/shared/api/users/types";
import { EFormMethods } from "~/shared/form";

export const getUserDetailsApi: TApiFunction<TUserDetailsParams, TUser> = (request, params) => {
  return fetchApi<TUser>(request, `/api/v1/users/userinfo/${params.id}`, {
    method: EFormMethods.Get,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${params.access_token}`,
      Accept: "application/json",
    },
  });
};
