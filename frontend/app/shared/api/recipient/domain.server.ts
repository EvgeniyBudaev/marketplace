import { apiDomainFunction } from "~/utils";
import {
  recipientEditParamsSchema,
  recipientParamsSchema,
  recipientSchema,
} from "~/shared/api/recipient/schemas";
import { editRecipientApi, getRecipientApi } from "~/shared/api/recipient/utils";

export const getRecipient = apiDomainFunction(
  recipientParamsSchema,
  recipientSchema,
)(getRecipientApi);

export const ediRecipient = apiDomainFunction(
  recipientEditParamsSchema,
  recipientSchema,
)(editRecipientApi);
