import { fetchApi } from "~/shared/api";
import type { TApiFunction } from "~/shared/api";
import type { TLanguage, TLanguageParams } from "~/shared/api/settings";
import { EFormMethods } from "~/shared/form";

export const updateLanguageApi: TApiFunction<TLanguageParams, TLanguage> = (request, params) => {
  const url = `/api/v1/settings/patch/language`;
  return fetchApi<TLanguage>(request, url, {
    method: EFormMethods.Patch,
    body: params,
  });
};
