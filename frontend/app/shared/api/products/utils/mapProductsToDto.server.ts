import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from "~/constants";
import type { TParams } from "~/types";

export const mapProductsToDto = (params: TParams) => {
  return {
    ...params,
    page: params?.page ? Number(params.page) : DEFAULT_PAGE,
    size: params?.size ? Number(params.size) : DEFAULT_PAGE_SIZE,
  };
};
