import type {TParams} from "~/types";

export const mapParamsAddAttributeToDto = (params: TParams) => {
  return {
    ...params,
    id: Number(params.id),
    filter: Boolean(params.filter),
    ...(params?.selectable && typeof params.selectable === "string" ? {selectable: JSON.parse(params.selectable.trim())} : {}),
  };
};
