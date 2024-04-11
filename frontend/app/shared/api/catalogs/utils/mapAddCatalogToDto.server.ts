import { formattedAttributeAliasList } from "#app/shared/api/catalogs/utils";
import type { TParams } from "#app/types";

export const mapAddCatalogToDto = (params: TParams) => {
  return {
    ...params,
    attributeAlias:
      params.attributeAlias && typeof params.attributeAlias === "string"
        ? formattedAttributeAliasList(JSON.parse(params.attributeAlias.trim()))
        : null,
    enabled: params?.enabled ? Boolean(params.enabled) : null,
  };
};
