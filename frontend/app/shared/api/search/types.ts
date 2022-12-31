import type { z } from "zod";
import type { searchProductsParamsSchema, searchProductsSchema } from "~/shared/api/search/schemas";

export type TSearchProductsParams = z.infer<typeof searchProductsParamsSchema>;

export type TSearchProducts = z.infer<typeof searchProductsSchema>;
