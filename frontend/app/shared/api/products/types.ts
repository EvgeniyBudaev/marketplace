import type { z } from "zod";
import type {
  productDetailParamsSchema,
  productDetailSchema,
  productsByCatalogSearchParamsSchema,
  productsItemSchema,
  productsSchema,
} from "./schemas";

export type TProduct = z.infer<typeof productsItemSchema>;

export type TProducts = z.infer<typeof productsSchema>;

export type TProductsByCatalogSearchParams = z.infer<typeof productsByCatalogSearchParamsSchema>;

export type TProductDetail = z.infer<typeof productDetailSchema>;

export type TProductDetailParams = z.infer<typeof productDetailParamsSchema>;
