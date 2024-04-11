import { fetchApi } from "#app/shared/api";
import type { TApiFunction } from "#app/shared/api";
import type {
  TRecipient,
  TRecipientEditParams,
} from "#app/shared/api/recipient";
import { EFormMethods } from "#app/shared/form";

export const editRecipientApi: TApiFunction<
  TRecipientEditParams,
  TRecipient
> = (request, params) => {
  const url = `/api/v1/recipients`;

  return fetchApi<TRecipient>(request, url, {
    method: EFormMethods.Patch,
    body: params,
  });
};
