import type { TParams } from "~/types";

export const mapCatalogEditFormDataToDto = (params: TParams) => {
  return {
    ...params,
    attributeAlias: JSON.stringify(params.attributeAlias),
    id: params.id.toString(),
  };
};
