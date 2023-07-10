import { apiDomainFunction } from "~/utils";
import {
  shippingEditParamsSchema,
  shippingParamsSchema,
  shippingSchema,
} from "~/shared/api/shipping";
import { editShippingApi, getShippingApi } from "~/shared/api/shipping/utils";

export const getShipping = apiDomainFunction(shippingParamsSchema, shippingSchema)(getShippingApi);

export const editShipping = apiDomainFunction(
  shippingEditParamsSchema,
  shippingSchema,
)(editShippingApi);
