import { apiDomainFunction } from "#app/utils";
import {
  recipientEditParamsSchema,
  recipientParamsSchema,
  recipientSchema,
} from "#app/shared/api/recipient/schemas";
import {
  editRecipientApi,
  getRecipientApi,
} from "#app/shared/api/recipient/utils";

export const getRecipient = apiDomainFunction(
  recipientParamsSchema,
  recipientSchema
)(getRecipientApi);

export const ediRecipient = apiDomainFunction(
  recipientEditParamsSchema,
  recipientSchema
)(editRecipientApi);
