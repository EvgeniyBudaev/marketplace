import type { TFile, TParams } from "#app/types";

type TResponse = {
  alias: string | null;
  catalogAlias: string | null;
  count: string | null;
  description: string | null;
  enabled: string;
  files: TFile[];
  name: string | null;
  numericValues: { attributeAlias: string; value: number }[] | null;
  price: string | null;
  // selectableValues: string | null;
  selectableValues: number[] | null;
};

export const mapProductAddToDto = (
  params: TParams,
  enabled: boolean,
  catalogAlias?: string
): TResponse => {
  return {
    ...params,
    alias: params?.alias ? params.alias : null,
    catalogAlias: catalogAlias ?? null,
    count: params?.count ? params.count : null,
    description: params?.description ? params.description : null,
    enabled: enabled.toString(),
    files: params?.files ? params.files : null,
    name: params?.name ? params.name : null,
    // numericValues: params?.numericValues ? JSON.stringify(params.numericValues) : null,
    numericValues: params?.numericValues ? params.numericValues : null,
    price: params?.price ? params.price : null,
    // selectableValues: params?.selectableValues ? JSON.stringify(params.selectableValues) : null,
    selectableValues: params?.selectableValues ? params.selectableValues : null,
  };
};
