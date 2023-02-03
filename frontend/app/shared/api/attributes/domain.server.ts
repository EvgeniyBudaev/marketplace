import {
  attributeAddParamsSchema,
  attributeAddSchema,
  attributesParamsSchema,
  attributesSchema,
} from "~/shared/api/attributes/schemas";
import { addAttributeApi, getAttributesApi } from "~/shared/api/attributes/utils";
import { apiDomainFunction } from "~/utils";

export const getAttributes = apiDomainFunction(
  attributesParamsSchema,
  attributesSchema,
)(getAttributesApi);

export const addAttribute = apiDomainFunction(
  attributeAddParamsSchema,
  attributeAddSchema,
)(addAttributeApi);
