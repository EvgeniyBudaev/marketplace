import type { TParams } from "~/types";
import type {TFile} from "~/types";

type TResponse = {
  alias: string | null;
  attributeAlias: { value: string, label: string }[] | null;
  enabled: string | null;
  image: TFile[];
  name: string | null;
};

export const mapCatalogAddFormDataToDto = (params: TParams): TResponse => {
  return {
    ...params,
    alias: params?.alias ? params.alias : null,
    attributeAlias: params?.attributeAlias ? params.attributeAlias : null,
    enabled: params?.enabled ? JSON.stringify(params.enabled) : null,
    image: params?.image ? params.image : null,
    name: params?.name ? params.name : null,
  };
};
