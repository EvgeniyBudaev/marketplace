import { fetchApi } from "#app/shared/api";
import type { TApiFunction } from "#app/shared/api";
import type { TRecipient, TRecipientParams } from "#app/shared/api/recipient";
import { EFormMethods } from "#app/shared/form";

export const getRecipientApi: TApiFunction<TRecipientParams, TRecipient> = (
  request,
  params
) => {
  const { uuid } = params;
  const url = `/api/v1/recipients/${uuid}`;

  return fetchApi<TRecipient>(request, url, {
    method: EFormMethods.Get,
  });
};
