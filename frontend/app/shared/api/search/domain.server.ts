import {
  searchProductsParamsSchema,
  searchProductsSchema,
} from "#app/shared/api/search/schemas";
import { searchProductsApi } from "#app/shared/api/search/utils";
import { apiDomainFunction } from "#app/utils";

export const searchProducts = apiDomainFunction(
  searchProductsParamsSchema,
  searchProductsSchema
)(searchProductsApi);
