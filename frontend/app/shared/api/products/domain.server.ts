import {
  productAddParamsSchema,
  productAddSchema,
  productDeleteParamsSchema,
  productDeleteSchema,
  productDetailParamsSchema,
  productDetailSchema,
  productsByCatalogSchema,
  productsByCatalogSearchParamsSchema,
  productsParamsSchema,
  productsSchema,
} from "~/shared/api/products/schemas";
import {
  getProductsByCatalogApi,
  getProductDetailApi,
  addProductApi,
  deleteProductApi,
  getProductsApi,
} from "~/shared/api/products/utils";
import { apiDomainFunction } from "~/utils";

export const getProducts = apiDomainFunction(productsParamsSchema, productsSchema)(getProductsApi);

export const getProductsByCatalog = apiDomainFunction(
  productsByCatalogSearchParamsSchema,
  productsByCatalogSchema,
)(getProductsByCatalogApi);

export const getProductDetail = apiDomainFunction(
  productDetailParamsSchema,
  productDetailSchema,
)(getProductDetailApi);

export const addProduct = apiDomainFunction(
  productAddParamsSchema,
  productAddSchema,
)(addProductApi);

export const deleteProduct = apiDomainFunction(
  productDeleteParamsSchema,
  productDeleteSchema,
)(deleteProductApi);
