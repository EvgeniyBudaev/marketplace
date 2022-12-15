import type { z } from "zod";
import {
  catalogAttributeItemSchema,
  catalogDetailParamsSchema,
  catalogDetailSchema,
  catalogsItemSchema,
  catalogsParamsSchema,
  catalogsSchema,
} from "./schemas";

export type TCatalogDetail = z.infer<typeof catalogDetailSchema>;
export type TCatalogsItem = z.infer<typeof catalogsItemSchema>;
export type TCatalogs = z.infer<typeof catalogsSchema>;

export type TCatalogAttributeItem = z.infer<typeof catalogAttributeItemSchema>;

export type TCatalogDetailParams = z.infer<typeof catalogDetailParamsSchema>;
export type TCatalogsParams = z.infer<typeof catalogsParamsSchema>;
