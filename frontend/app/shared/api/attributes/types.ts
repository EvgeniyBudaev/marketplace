import type { z } from "zod";
import {
  attributeAddParamsSchema,
  attributeAddSchema,
  attributeDeleteParamsSchema,
  attributeDeleteSchema,
  attributeDetailParamsSchema,
  attributeDetailSchema,
  attributeEditParamsSchema,
  attributeEditSchema,
  attributesItemSchema,
  attributesParamsSchema,
  attributesSchema,
  selectableItemSchema,
  selectableValueAddParamsSchema,
  selectableValueAddSchema,
  selectableValueDeleteParamsSchema,
  selectableValueDeleteSchema,
  selectableValueEditParamsSchema,
  selectableValueEditSchema,
} from "~/shared/api/attributes/schemas";

export type TAttribute = z.infer<typeof attributesItemSchema>;
export type TAttributes = z.infer<typeof attributesSchema>;
export type TAttributesParams = z.infer<typeof attributesParamsSchema>;

export type TAttributeAddParams = z.infer<typeof attributeAddParamsSchema>;
export type TAttributeAdd = z.infer<typeof attributeAddSchema>;

export type TAttributeEditParams = z.infer<typeof attributeEditParamsSchema>;
export type TAttributeEdit = z.infer<typeof attributeEditSchema>;

export type TAttributeDeleteParams = z.infer<typeof attributeDeleteParamsSchema>;
export type TAttributeDelete = z.infer<typeof attributeDeleteSchema>;

export type TAttributeDetailParams = z.infer<typeof attributeDetailParamsSchema>;
export type TAttributeDetail = z.infer<typeof attributeDetailSchema>;

export type TSelectableItem = z.infer<typeof selectableItemSchema>;

export type TSelectableValueEditParams = z.infer<typeof selectableValueEditParamsSchema>;
export type TSelectableValueEdit = z.infer<typeof selectableValueEditSchema>;

export type TSelectableValueDeleteParams = z.infer<typeof selectableValueDeleteParamsSchema>;
export type TSelectableValueDelete = z.infer<typeof selectableValueDeleteSchema>;

export type TSelectableValueAddParams = z.infer<typeof selectableValueAddParamsSchema>;
export type TSelectableValueAdd = z.infer<typeof selectableValueAddSchema>;
