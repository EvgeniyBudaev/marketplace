import { catalogDetailRequestSchema, catalogDetailSchema } from "~/shared/api/catalogs/schemas";
import { getCatalogDetailApi } from "~/shared/api/catalogs/utils";
import { apiDomainFunction } from "~/utils";

export const getCatalogDetail = apiDomainFunction(
  catalogDetailRequestSchema,
  catalogDetailSchema,
)(getCatalogDetailApi);
