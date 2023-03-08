import type { TParams } from "~/types";

export const mapCatalogAddFormDataToDto = (params: TParams) => {
  return {
    ...params,
    attributeAlias: JSON.stringify(params.attributeAlias),
  };
};
