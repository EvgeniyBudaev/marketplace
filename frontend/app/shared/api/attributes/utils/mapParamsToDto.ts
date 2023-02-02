import { DEFAULT_PAGE_SIZE } from "~/constants";
import type { TParams } from "~/types";

export const mapParamsToDto = (params: TParams) => {
  return {
    ...params,
    size: params?.size ? Number(params.size) : DEFAULT_PAGE_SIZE,
  };
};
