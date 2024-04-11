import { fetchApi } from "#app/shared/api";
import type { TApiFunction } from "#app/shared/api";
import { TRefreshToken, TRefreshTokenParams } from "#app/shared/api/auth";
import { EFormMethods } from "#app/shared/form";

export const refreshTokenApi: TApiFunction<
  TRefreshTokenParams,
  TRefreshToken
> = (request, params) => {
  return fetchApi<TRefreshToken>(request, `/api/v1/auth/refresh`, {
    method: EFormMethods.Post,
    body: params,
  });
};
