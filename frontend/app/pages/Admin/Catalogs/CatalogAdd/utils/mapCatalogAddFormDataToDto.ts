import type { TParams } from "#app/types";
import type { TFile } from "#app/types";

type TResponse = {
  alias: string | null;
  attributeAlias: { value: string; label: string }[] | null;
  enabled: string;
  image: TFile[];
  name: string | null;
};

export const mapCatalogAddFormDataToDto = (
  params: TParams,
  enabled: boolean
): TResponse => {
  return {
    ...params,
    alias: params?.alias ? params.alias : null,
    attributeAlias: params?.attributeAlias ? params.attributeAlias : null,
    enabled: enabled.toString(),
    image: params?.image ? params.image : null,
    name: params?.name ? params.name : null,
  };
};
