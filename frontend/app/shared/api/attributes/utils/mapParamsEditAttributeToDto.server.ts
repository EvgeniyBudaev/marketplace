import type { TParams } from "~/types";

export const mapParamsEditAttributeToDto = (params: TParams) => {
  return {
    ...params,
    id: Number(params.id),
    filter: Boolean(params.filter),
    selectable:
      params.selectable && typeof params.selectable === "string"
        ? JSON.parse(params.selectable.trim())
        : params.selectable,
  };
};
