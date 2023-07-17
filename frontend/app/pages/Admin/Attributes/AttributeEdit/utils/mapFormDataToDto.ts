import type {TParams} from "~/types";

export const mapFormDataToDto = (params: TParams) => {
  return {
    ...params,
    id: params.id,
    ...(params?.selectable ? {selectable: JSON.stringify(params.selectable)} : {}),
    type: params.type.value,
  };
};
