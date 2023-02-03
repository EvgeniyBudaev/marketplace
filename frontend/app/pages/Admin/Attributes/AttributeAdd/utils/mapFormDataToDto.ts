import { TParams } from "~/types";

export const mapFormDataToDto = (params: TParams) => {
  return {
    ...params,
    selectable: JSON.stringify(params.selectable),
    type: params.type.value,
  };
};
