import type { TParams } from "#app/types";
import {
  getNumericValues,
  getSelectableValues,
} from "#app/shared/api/products/utils";

export const mapProductEditToDto = (params: TParams) => {
  return {
    ...params,
    count: Number(params.count),
    enabled: Boolean(params.enabled),
    id: Number(params.id),
    numericValues:
      params.numericValues && typeof params.numericValues === "string"
        ? getNumericValues(params.numericValues)
        : params.numericValues,
    price: Number(params.price),
    selectableValues:
      params.selectableValues && typeof params.selectableValues === "string"
        ? getSelectableValues(params.selectableValues)
        : params.selectableValues,
  };
};
