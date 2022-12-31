import { z } from "zod";
import { productsSchema } from "~/shared/api/products";

export const searchProductsSchema = productsSchema;

export const searchProductsParamsSchema = z.object({
  search: z.string(),
  params: z
    .object({
      currentPage: z.union([z.string(), z.number()]).nullish(),
      pageSize: z.union([z.string(), z.number()]).nullish(),
    })
    .optional(),
});
