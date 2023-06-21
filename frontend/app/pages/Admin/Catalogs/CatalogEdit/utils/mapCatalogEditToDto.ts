import type {TFile, TParams} from "~/types";

type TResponse = {
  alias: string | null;
  attributeAlias: { value: string, label: string }[] | null;
  enabled: string | null;
  id: string;
  image: TFile[];
  name: string | null;
};

export const mapCatalogEditToDto = (params: TParams, id: string | number): TResponse => {
  return {
    ...params,
    alias: params?.alias ? params.alias : null,
    attributeAlias: params?.attributeAlias ? params.attributeAlias : null,
    enabled: params?.enabled ? JSON.stringify(params.enabled) : null,
    id: id.toString(),
    image: params?.image ? params.image : null,
    name: params?.name ? params.name : null,
  };
};