import { apiDomainFunction } from "#app/utils";
import {
  shippingEditParamsSchema,
  shippingParamsSchema,
  shippingSchema,
} from "#app/shared/api/shipping";
import {
  editShippingApi,
  getShippingApi,
} from "#app/shared/api/shipping/utils";

export const getShipping = apiDomainFunction(
  shippingParamsSchema,
  shippingSchema
)(getShippingApi);

export const editShipping = apiDomainFunction(
  shippingEditParamsSchema,
  shippingSchema
)(editShippingApi);
