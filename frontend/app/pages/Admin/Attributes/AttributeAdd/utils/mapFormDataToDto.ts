import type { TParams } from "~/types";

export const mapFormDataToDto = (params: TParams) => {
  return {
    ...params,
    ...(params?.selectable ? { selectable: JSON.stringify(params.selectable) } : {}),
    type: params.type.value,
  };
};
