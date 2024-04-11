import { fetchApi } from "#app/shared/api";
import type { TApiFunction } from "#app/shared/api";
import type { TTheme, TThemeParams } from "#app/shared/api/settings";
import { EFormMethods } from "#app/shared/form";

export const updateThemeApi: TApiFunction<TThemeParams, TTheme> = (
  request,
  params
) => {
  const url = `/api/v1/settings/patch/theme`;
  return fetchApi<TTheme>(request, url, {
    method: EFormMethods.Patch,
    body: params,
  });
};
