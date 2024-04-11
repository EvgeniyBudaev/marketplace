import type { TParams } from "#app/types";
import {
  getNumericValues,
  getSelectableValues,
} from "#app/shared/api/products/utils";

export const mapProductAddToDto = (params: TParams) => {
  return {
    ...params,
    count: Number(params.count),
    enabled: Boolean(params.enabled),
    numericValues:
      params.numericValues &&
      params.numericValues.map((item: string) => {
        const numericValue: { attributeAlias: string; value: string } =
          JSON.parse(item.trim());
        return { ...numericValue, value: Number(numericValue.value) };
      }),
    // numericValues:
    //   params.numericValues && typeof params.numericValues === "string"
    //     ? getNumericValues(params.numericValues)
    //     : params.numericValues,
    price: Number(params.price),
    selectableValues:
      params.selectableValues &&
      params.selectableValues.map((item: string) => Number(item)),
    // selectableValues:
    //   params.selectableValues && typeof params.selectableValues === "string"
    //     ? getSelectableValues(params.selectableValues)
    //     : params.selectableValues,
  };
};
