import { fetchApi } from "~/shared/api";
import type { TApiFunction } from "~/shared/api";
import type { TRecipient, TRecipientParams } from "~/shared/api/recipient";
import { EFormMethods } from "~/shared/form";

export const getRecipientApi: TApiFunction<TRecipientParams, TRecipient> = (request, params) => {
  const { uuid } = params;
  const url = `/api/v1/recipients/${uuid}`;
  console.log("url: ", url);

  return fetchApi<TRecipient>(request, url, {
    method: EFormMethods.Get,
  });
};
