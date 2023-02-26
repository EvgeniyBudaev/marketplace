import type { TParams } from "~/types";

export const mapProductAddToDto = (params: TParams) => {
  return {
    ...params,
    catalogAlias: params?.catalogAlias ? params.catalogAlias.value : null,
    numericValues: JSON.stringify(params.numericValues),
    selectableValues: JSON.stringify(params.selectableValues),
  };
};
