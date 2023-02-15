import type { TParams } from "~/types";

export const mapParamsAddSelectableValueToDto = (params: TParams) => {
  return {
    ...params,
    attributeAlias: params.attributeAlias,
    value: params.value,
  };
};
