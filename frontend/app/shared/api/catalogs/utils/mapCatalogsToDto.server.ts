import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from "#app/constants";
import type { TParams } from "#app/types";

export const mapCatalogsToDto = (params: TParams) => {
  return {
    ...params,
    page: params?.page ? Number(params.page) : DEFAULT_PAGE,
    size: params?.size ? Number(params.size) : DEFAULT_PAGE_SIZE,
  };
};
