import { searchProductsParamsSchema, searchProductsSchema } from "~/shared/api/search/schemas";
import { searchProductsApi } from "~/shared/api/search/utils";
import { apiDomainFunction } from "~/utils";

export const searchProducts = apiDomainFunction(
  searchProductsParamsSchema,
  searchProductsSchema,
)(searchProductsApi);
