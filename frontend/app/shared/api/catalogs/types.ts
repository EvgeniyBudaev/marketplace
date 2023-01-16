import type { z } from "zod";
import type {
  catalogAttributeItemSchema,
  catalogDetailParamsSchema,
  catalogDetailSchema,
  catalogsItemSchema,
  catalogsParamsSchema,
  catalogsSchema,
  catalogAddParamsSchema,
  catalogAddSchema,
} from "./schemas";

export type TCatalogDetail = z.infer<typeof catalogDetailSchema>;
export type TCatalogsItem = z.infer<typeof catalogsItemSchema>;
export type TCatalogs = z.infer<typeof catalogsSchema>;

export type TCatalogAttributeItem = z.infer<typeof catalogAttributeItemSchema>;

export type TCatalogDetailParams = z.infer<typeof catalogDetailParamsSchema>;
export type TCatalogsParams = z.infer<typeof catalogsParamsSchema>;

export type TCatalogAddParams = z.infer<typeof catalogAddParamsSchema>;
export type TCatalogAdd = z.infer<typeof catalogAddSchema>;
