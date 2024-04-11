import type { z } from "zod";
import type {
  adminProductDetailParamsSchema,
  adminProductDetailSchema,
  productDetailParamsSchema,
  productDetailSchema,
  productsByCatalogSearchParamsSchema,
  productsItemSchema,
  productsByCatalogItemSchema,
  productsSchema,
  productsByCatalogSchema,
  productsParamsSchema,
  productAddSchema,
  productAddParamsSchema,
  productDeleteParamsSchema,
  productDeleteSchema,
  productEditParamsSchema,
  productEditSchema,
} from "./schemas";

export type TProduct = z.infer<typeof productsItemSchema>;
export type TProductByCatalog = z.infer<typeof productsByCatalogItemSchema>;

export type TProducts = z.infer<typeof productsSchema>;
export type TProductsParams = z.infer<typeof productsParamsSchema>;

export type TProductsByCatalogSearchParams = z.infer<
  typeof productsByCatalogSearchParamsSchema
>;
export type TProductsByCatalog = z.infer<typeof productsByCatalogSchema>;

export type TProductDetail = z.infer<typeof productDetailSchema>;
export type TProductDetailParams = z.infer<typeof productDetailParamsSchema>;

export type TAdminProductDetail = z.infer<typeof adminProductDetailSchema>;
export type TAdminProductDetailParams = z.infer<
  typeof adminProductDetailParamsSchema
>;

export type TProductAdd = z.infer<typeof productAddSchema>;
export type TProductAddParams = z.infer<typeof productAddParamsSchema>;

export type TProductDelete = z.infer<typeof productDeleteSchema>;
export type TProductDeleteParams = z.infer<typeof productDeleteParamsSchema>;

export type TProductEdit = z.infer<typeof productEditSchema>;
export type TProductEditParams = z.infer<typeof productEditParamsSchema>;
