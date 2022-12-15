import {
  catalogDetailParamsSchema,
  catalogDetailSchema,
  catalogsParamsSchema,
  catalogsSchema,
} from "~/shared/api/catalogs/schemas";
import { getCatalogDetailApi, getCatalogsApi } from "~/shared/api/catalogs/utils";
import { apiDomainFunction } from "~/utils";

export const getCatalogDetail = apiDomainFunction(
  catalogDetailParamsSchema,
  catalogDetailSchema,
)(getCatalogDetailApi);

export const getCatalogs = apiDomainFunction(catalogsParamsSchema, catalogsSchema)(getCatalogsApi);
