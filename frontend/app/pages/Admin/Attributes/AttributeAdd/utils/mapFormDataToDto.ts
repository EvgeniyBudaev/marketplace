import { TParams } from "~/types";

export const mapFormDataToDto = (params: TParams) => {
  return {
    ...params,
    type: params.type.value,
  };
};
