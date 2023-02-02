import type { z } from "zod";
import {
  attributeAddParamsSchema,
  attributeAddSchema,
  attributesItemSchema,
  attributesParamsSchema,
  attributesSchema,
} from "~/shared/api/attributes/schemas";

export type TAttribute = z.infer<typeof attributesItemSchema>;
export type TAttributes = z.infer<typeof attributesSchema>;
export type TAttributesParams = z.infer<typeof attributesParamsSchema>;

export type TAttributeAddParams = z.infer<typeof attributeAddParamsSchema>;
export type TAttributeAdd = z.infer<typeof attributeAddSchema>;
