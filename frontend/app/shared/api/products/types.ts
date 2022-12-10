import type { z } from "zod";
import { productsByCatalogSearchParamsSchema, productsItemSchema, productsSchema } from "./schemas";

export type TProduct = z.infer<typeof productsItemSchema>;

export type TProducts = z.infer<typeof productsSchema>;

export type TProductsByCatalogSearchParams = z.infer<typeof productsByCatalogSearchParamsSchema>;
