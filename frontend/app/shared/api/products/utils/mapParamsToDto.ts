import { DEFAULT_PAGE_SIZE } from "~/constants";
import type { TParams } from "~/types";

export const mapParamsToDto = (params: TParams) => {
  return {
    ...params,
    pageSize: params?.pageSize ? Number(params.pageSize) : DEFAULT_PAGE_SIZE,
  };
};
