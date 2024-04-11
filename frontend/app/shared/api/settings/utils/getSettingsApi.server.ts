import { fetchApi } from "#app/shared/api";
import type { TApiFunction } from "#app/shared/api";
import type { TSettings, TSettingsParams } from "#app/shared/api/settings";
import { EFormMethods } from "#app/shared/form";

export const getSettingsApi: TApiFunction<TSettingsParams, TSettings> = (
  request,
  params
) => {
  const url = `/api/v1/settings`;
  return fetchApi<TSettings>(request, url, {
    method: EFormMethods.Post,
    body: params,
  });
};
