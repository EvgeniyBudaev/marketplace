import { formattedAttributeAliasList } from "~/shared/api/catalogs/utils";
import type { TParams } from "~/types";

export const mapAddCatalogToDto = (params: TParams) => {
  return {
    ...params,
    attributeAlias: params?.attributeAlias
      ? formattedAttributeAliasList(params.attributeAlias)
      : null,
    enabled: params?.enabled ? Boolean(params.enabled) : null,
  };
};
