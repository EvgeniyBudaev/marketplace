import {
  attributeAddParamsSchema,
  attributeAddSchema,
  attributeDeleteParamsSchema,
  attributeDeleteSchema,
  attributeDetailParamsSchema,
  attributeDetailSchema,
  attributeEditParamsSchema,
  attributeEditSchema,
  attributesParamsSchema,
  attributesSchema,
} from "~/shared/api/attributes/schemas";
import {
  addAttributeApi,
  deleteAttributeApi,
  editAttributeApi,
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

export const editAttribute = apiDomainFunction(
  attributeEditParamsSchema,
  attributeEditSchema,
)(editAttributeApi);

export const deleteAttribute = apiDomainFunction(
  attributeDeleteParamsSchema,
  attributeDeleteSchema,
)(deleteAttributeApi);

export const getAttributeDetail = apiDomainFunction(
  attributeDetailParamsSchema,
  attributeDetailSchema,
)(getAttributeDetailApi);
