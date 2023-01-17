import {
  productAddParamsSchema,
  productAddSchema,
  productDetailParamsSchema,
  productDetailSchema,
  productsByCatalogSearchParamsSchema,
  productsParamsSchema,
  productsSchema,
} from "~/shared/api/products/schemas";
import {
  getProductsByCatalogApi,
  getProductDetailApi,
  addProductApi,
} from "~/shared/api/products/utils";
import { apiDomainFunction } from "~/utils";

export const getProducts = apiDomainFunction(
  productsParamsSchema,
  productsSchema,
)(getProductsByCatalogApi);

export const getProductsByCatalog = apiDomainFunction(
  productsByCatalogSearchParamsSchema,
  productsSchema,
)(getProductsByCatalogApi);

export const getProductDetail = apiDomainFunction(
  productDetailParamsSchema,
  productDetailSchema,
)(getProductDetailApi);

export const addProduct = apiDomainFunction(
  productAddParamsSchema,
  productAddSchema,
)(addProductApi);
