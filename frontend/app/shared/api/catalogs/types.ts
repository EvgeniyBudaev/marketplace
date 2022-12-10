import type { z } from "zod";
import {
  catalogAttributeItemSchema,
  catalogDetailRequestSchema,
  catalogDetailSchema,
} from "./schemas";

export type TCatalogDetail = z.infer<typeof catalogDetailSchema>;

export type TCatalogAttributeItem = z.infer<typeof catalogAttributeItemSchema>;

export type TCatalogDetailRequest = z.infer<typeof catalogDetailRequestSchema>;
