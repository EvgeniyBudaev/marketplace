import type { TParams } from "~/types";

export const mapParamsEditSelectableValueToDto = (params: TParams) => {
  return {
    ...params,
    id: Number(params.id),
    value: params?.value ?? "",
  };
};
