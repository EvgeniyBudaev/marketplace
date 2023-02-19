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
  catalogDeleteSchema,
  catalogDeleteParamsSchema,
} from "./schemas";

export type TCatalogDetail = z.infer<typeof catalogDetailSchema>;
export type TCatalog = z.infer<typeof catalogsItemSchema>;
export type TCatalogs = z.infer<typeof catalogsSchema>;

export type TCatalogAttributeItem = z.infer<typeof catalogAttributeItemSchema>;

export type TCatalogDetailParams = z.infer<typeof catalogDetailParamsSchema>;
export type TCatalogsParams = z.infer<typeof catalogsParamsSchema>;

export type TCatalogAddParams = z.infer<typeof catalogAddParamsSchema>;
export type TCatalogAdd = z.infer<typeof catalogAddSchema>;

export type TCatalogDeleteParams = z.infer<typeof catalogDeleteParamsSchema>;
export type TCatalogDelete = z.infer<typeof catalogDeleteSchema>;
