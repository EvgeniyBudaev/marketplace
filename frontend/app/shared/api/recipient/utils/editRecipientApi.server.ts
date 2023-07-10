import { fetchApi } from "~/shared/api";
import type { TApiFunction } from "~/shared/api";
import type { TRecipient, TRecipientEditParams } from "~/shared/api/recipient";
import { EFormMethods } from "~/shared/form";

export const editRecipientApi: TApiFunction<TRecipientEditParams, TRecipient> = (
  request,
  params,
) => {
  const url = `/api/v1/recipients`;

  return fetchApi<TRecipient>(request, url, {
    method: EFormMethods.Patch,
    body: params,
  });
};
