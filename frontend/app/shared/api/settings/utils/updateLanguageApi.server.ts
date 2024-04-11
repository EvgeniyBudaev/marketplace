import { fetchApi } from "#app/shared/api";
import type { TApiFunction } from "#app/shared/api";
import type { TLanguage, TLanguageParams } from "#app/shared/api/settings";
import { EFormMethods } from "#app/shared/form";

export const updateLanguageApi: TApiFunction<TLanguageParams, TLanguage> = (
  request,
  params
) => {
  const url = `/api/v1/settings/patch/language`;
  return fetchApi<TLanguage>(request, url, {
    method: EFormMethods.Patch,
    body: params,
  });
};
