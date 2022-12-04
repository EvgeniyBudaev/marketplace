import type { z } from "zod";
import { catalogAttributeItemSchema, catalogDetailSchema } from "./schemas";

export type TCatalog = z.infer<typeof catalogDetailSchema>;

export type TCatalogAttributeItem = z.infer<typeof catalogAttributeItemSchema>
