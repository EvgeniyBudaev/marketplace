import { productsByCatalogSearchParamsSchema, productsSchema } from "~/shared/api/products/schemas";
import { getProductsByCatalogApi } from "~/shared/api/products/utils";
import { apiDomainFunction } from "~/utils";

export const getProductsByCatalog = apiDomainFunction(
  productsByCatalogSearchParamsSchema,
  productsSchema,
)(getProductsByCatalogApi);
