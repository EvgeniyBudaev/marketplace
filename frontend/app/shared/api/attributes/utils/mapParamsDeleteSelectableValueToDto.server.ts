import type { TParams } from "~/types";

export const mapParamsDeleteSelectableValueToDto = (params: TParams) => {
  return {
    ...params,
    id: Number(params.id),
  };
};
