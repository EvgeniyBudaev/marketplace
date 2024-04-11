import type { TParams } from "#app/types";

export const mapParamsEditSelectableValueToDto = (params: TParams) => {
  return {
    ...params,
    id: Number(params.id),
    value: params?.value ?? "",
  };
};
