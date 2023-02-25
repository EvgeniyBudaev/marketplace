import { formattedAttributeAliasList } from "~/shared/api/catalogs/utils";
import type { TParams } from "~/types";

export const mapEditCatalogToDto = (params: TParams) => {
  return {
    ...params,
    attributeAlias:
      params.attributeAlias && typeof params.attributeAlias === "string"
        ? formattedAttributeAliasList(JSON.parse(params.attributeAlias.trim()))
        : null,
    enabled: params?.enabled ? Boolean(params.enabled) : null,
    id: params?.id ? Number(params.id) : null,
  };
};
