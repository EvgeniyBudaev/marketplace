import type { TFile, TParams } from "~/types";

type TResponse = {
  alias: string | null;
  catalogAlias: string | null;
  count: string | null;
  defaultImages: TFile[];
  description: string | null;
  enabled: string | null;
  files: TFile[];
  name: string | null;
  numericValues: { attributeAlias: string; value: number }[] | null;
  price: string | null;
  // selectableValues: string | null;
  selectableValues: number[] | null;
};

export const mapProductAddToDto = (params: TParams): TResponse => {
  return {
    ...params,
    alias: params?.alias ? params.alias : null,
    catalogAlias: params?.catalogAlias ? params.catalogAlias.value : null,
    count: params?.count ? params.count : null,
    defaultImages: params?.defaultImages ? params.defaultImages : null,
    description: params?.description ? params.description : null,
    enabled: params?.enabled ? JSON.stringify(params.enabled) : null,
    files: params?.files ? params.files : null,
    name: params?.name ? params.name : null,
    // numericValues: params?.numericValues ? JSON.stringify(params.numericValues) : null,
    numericValues: params?.numericValues ? params.numericValues : null,
    price: params?.price ? params.price : null,
    // selectableValues: params?.selectableValues ? JSON.stringify(params.selectableValues) : null,
    selectableValues: params?.selectableValues ? params.selectableValues : null,
  };
};
