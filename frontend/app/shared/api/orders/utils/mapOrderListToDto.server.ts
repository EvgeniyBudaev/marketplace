import isNil from "lodash/isNil";

import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from "#app/constants";
import type { TParams } from "#app/types";
export const mapOrderListToDto = (params: TParams) => {
  return {
    ...params,
    page: params?.page ? params.page.toString() : DEFAULT_PAGE.toString(),
    size: params?.size ? params.size.toString() : DEFAULT_PAGE_SIZE.toString(),
    ...(!isNil(params.search) && { statuses: params.search }),
  };
};
