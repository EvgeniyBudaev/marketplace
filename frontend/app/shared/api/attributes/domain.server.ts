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
  selectableValueAddParamsSchema,
  selectableValueAddSchema,
  selectableValueDeleteParamsSchema,
  selectableValueDeleteSchema,
  selectableValueEditParamsSchema,
  selectableValueEditSchema,
} from "~/shared/api/attributes/schemas";
import {
  addAttributeApi,
  addSelectableValueApi,
  deleteAttributeApi,
  editAttributeApi,
  editSelectableValueApi,
  getAttributeDetailApi,
  getAttributesApi,
} from "~/shared/api/attributes/utils";
import { apiDomainFunction } from "~/utils";
import { deleteSelectableValueApi } from "~/shared/api/attributes/utils/deleteSelectableValueApi.server";

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

export const editSelectableValue = apiDomainFunction(
  selectableValueEditParamsSchema,
  selectableValueEditSchema,
)(editSelectableValueApi);

export const deleteSelectableValue = apiDomainFunction(
  selectableValueDeleteParamsSchema,
  selectableValueDeleteSchema,
)(deleteSelectableValueApi);

export const addSelectableValue = apiDomainFunction(
  selectableValueAddParamsSchema,
  selectableValueAddSchema,
)(addSelectableValueApi);
