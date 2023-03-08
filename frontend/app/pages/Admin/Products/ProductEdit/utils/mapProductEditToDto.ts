import type { TParams } from "~/types";

export const mapProductEditToDto = (params: TParams, id: string | number) => {
  return {
    ...params,
    catalogAlias: params?.catalogAlias ? params.catalogAlias.value : null,
    id: id.toString(),
    numericValues: JSON.stringify(params.numericValues),
    selectableValues: JSON.stringify(params.selectableValues),
  };
};
