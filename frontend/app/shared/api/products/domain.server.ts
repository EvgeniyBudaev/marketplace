import {
  adminProductDetailParamsSchema,
  adminProductDetailSchema,
  productAddParamsSchema,
  productAddSchema,
  productDeleteParamsSchema,
  productDeleteSchema,
  productDetailParamsSchema,
  productDetailSchema,
  productEditParamsSchema,
  productEditSchema,
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
  getAdminProductDetailApi,
  editProductApi,
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

export const getAdminProductDetail = apiDomainFunction(
  adminProductDetailParamsSchema,
  adminProductDetailSchema,
)(getAdminProductDetailApi);

export const addProduct = apiDomainFunction(
  productAddParamsSchema,
  productAddSchema,
)(addProductApi);

export const editProduct = apiDomainFunction(
  productEditParamsSchema,
  productEditSchema,
)(editProductApi);

export const deleteProduct = apiDomainFunction(
  productDeleteParamsSchema,
  productDeleteSchema,
)(deleteProductApi);
