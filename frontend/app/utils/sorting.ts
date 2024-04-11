import type { TSorting } from "#app/types";

export const mapSortingToDto = (params?: TSorting) => {
  return {
    sort: params?.value ?? "",
  };
};
