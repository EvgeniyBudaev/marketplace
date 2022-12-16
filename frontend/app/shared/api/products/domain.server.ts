import {
  productDetailParamsSchema,
  productDetailSchema,
  productsByCatalogSearchParamsSchema,
  productsSchema,
} from "~/shared/api/products/schemas";
import { getProductsByCatalogApi, getProductDetailApi } from "~/shared/api/products/utils";
import { apiDomainFunction } from "~/utils";

export const getProductsByCatalog = apiDomainFunction(
  productsByCatalogSearchParamsSchema,
  productsSchema,
)(getProductsByCatalogApi);

export const getProductDetail = apiDomainFunction(
  productDetailParamsSchema,
  productDetailSchema,
)(getProductDetailApi);
