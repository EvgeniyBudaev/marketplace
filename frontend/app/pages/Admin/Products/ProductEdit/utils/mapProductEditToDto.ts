import type { TFile, TParams } from "~/types";

type TResponse = {
  alias: string | null;
  catalogAlias: string | null;
  count: string | null;
  description: string | null;
  enabled: string | null;
  files: TFile[];
  id: string;
  images: string[] | null;
  name: string | null;
  numericValues: { attributeAlias: string; value: number }[] | null;
  price: string | null;
  selectableValues: number[] | null;
};

export const mapProductEditToDto = (
  params: TParams,
  id: string | number,
  images: string[] | null,
): TResponse => {
  return {
    ...params,
    alias: params?.alias ? params.alias : null,
    catalogAlias: params?.catalogAlias ? params.catalogAlias.value : null,
    count: params?.count ? params.count : null,
    description: params?.description ? params.description : null,
    enabled: params?.enabled ? JSON.stringify(params.enabled) : null,
    files: params?.files ? params.files : null,
    id: id.toString(),
    images: images ? images : null,
    name: params?.name ? params.name : null,
    numericValues: params?.numericValues ? params.numericValues : null,
    price: params?.price ? params.price : null,
    selectableValues: params?.selectableValues ? params.selectableValues : null,
  };
};
