import {
  catalogAddParamsSchema,
  catalogAddSchema,
  catalogDeleteParamsSchema,
  catalogDeleteSchema,
  catalogDetailParamsSchema,
  catalogDetailSchema,
  catalogEditParamsSchema,
  catalogEditSchema,
  catalogsParamsSchema,
  catalogsSchema,
} from "~/shared/api/catalogs/schemas";
import {
  addCatalogApi,
  deleteCatalogApi,
  editCatalogApi,
  getCatalogDetailApi,
  getCatalogsApi,
} from "~/shared/api/catalogs/utils";
import { apiDomainFunction } from "~/utils";

export const getCatalogDetail = apiDomainFunction(
  catalogDetailParamsSchema,
  catalogDetailSchema,
)(getCatalogDetailApi);

export const getCatalogs = apiDomainFunction(catalogsParamsSchema, catalogsSchema)(getCatalogsApi);

export const addCatalog = apiDomainFunction(
  catalogAddParamsSchema,
  catalogAddSchema,
)(addCatalogApi);

export const deleteCatalog = apiDomainFunction(
  catalogDeleteParamsSchema,
  catalogDeleteSchema,
)(deleteCatalogApi);

export const editCatalog = apiDomainFunction(
  catalogEditParamsSchema,
  catalogEditSchema,
)(editCatalogApi);
