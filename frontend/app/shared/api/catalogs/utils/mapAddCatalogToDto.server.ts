import { TParams } from "~/types";

export const mapAddCatalogToDto = (params: TParams) => {
  return {
    ...params,
    enabled: params?.enabled ? Boolean(params.enabled) : null,
  };
};
