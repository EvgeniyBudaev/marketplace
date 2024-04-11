import { z } from "zod";
import { productsByCatalogSchema } from "#app/shared/api/products";

export const searchProductsSchema = productsByCatalogSchema;

export const searchProductsParamsSchema = z.object({
  search: z.string(),
  params: z
    .object({
      currentPage: z.union([z.string(), z.number()]).nullish(),
      pageSize: z.union([z.string(), z.number()]).nullish(),
    })
    .optional(),
});
