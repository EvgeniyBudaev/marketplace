import {
  attributeAddParamsSchema,
  attributeAddSchema,
  attributeDetailParamsSchema,
  attributeDetailSchema,
  attributesParamsSchema,
  attributesSchema,
} from "~/shared/api/attributes/schemas";
import {
  addAttributeApi,
  getAttributeDetailApi,
  getAttributesApi,
} from "~/shared/api/attributes/utils";
import { apiDomainFunction } from "~/utils";

export const getAttributes = apiDomainFunction(
  attributesParamsSchema,
  attributesSchema,
)(getAttributesApi);

export const addAttribute = apiDomainFunction(
  attributeAddParamsSchema,
  attributeAddSchema,
)(addAttributeApi);

export const getAttributeDetail = apiDomainFunction(
  attributeDetailParamsSchema,
  attributeDetailSchema,
)(getAttributeDetailApi);
