import { fetchApi } from "~/shared/api";
import type { TApiFunction } from "~/shared/api";
import { TRefreshToken, TRefreshTokenParams } from "~/shared/api/auth";
import { EFormMethods } from "~/shared/form";

export const refreshTokenApi: TApiFunction<TRefreshTokenParams, TRefreshToken> = (
  request,
  params,
) => {
  return fetchApi<TRefreshToken>(request, `/api/v1/auth/refresh`, {
    method: EFormMethods.Post,
    body: params,
  });
};
