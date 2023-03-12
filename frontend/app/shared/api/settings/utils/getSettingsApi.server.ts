import { fetchApi } from "~/shared/api";
import type { TApiFunction } from "~/shared/api";
import type { TSettings, TSettingsParams } from "~/shared/api/settings";
import { EFormMethods } from "~/shared/form";

export const getSettingsApi: TApiFunction<TSettingsParams, TSettings> = (request, params) => {
  const url = `/api/v1/settings`;
  return fetchApi<TSettings>(request, url, {
    method: EFormMethods.Post,
    body: params,
  });
};
