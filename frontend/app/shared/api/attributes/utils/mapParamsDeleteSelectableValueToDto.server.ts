import type { TParams } from "#app/types";

export const mapParamsDeleteSelectableValueToDto = (params: TParams) => {
  return {
    ...params,
    id: Number(params.id),
  };
};
