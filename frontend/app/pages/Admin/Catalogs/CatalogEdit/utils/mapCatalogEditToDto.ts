import type {TFile, TParams} from "~/types";

type TResponse = {
  alias: string | null;
  attributeAlias: { value: string, label: string }[] | null;
  enabled: string;
  id: string;
  image: TFile[];
  name: string | null;
};

export const mapCatalogEditToDto = (params: TParams, id: string | number, enabled: boolean): TResponse => {
  return {
    ...params,
    alias: params?.alias ? params.alias : null,
    attributeAlias: params?.attributeAlias ? params.attributeAlias : null,
    enabled: enabled.toString(),
    id: id.toString(),
    image: params?.image ? params.image : null,
    name: params?.name ? params.name : null,
  };
};