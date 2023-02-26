import type { TParams } from "~/types";

export const mapProductAddToDto = (params: TParams) => {
  return {
    ...params,
    count: Number(params.count),
    enabled: Boolean(params.enabled),
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

const getNumericValues = (data: string) => {
  const numericValues: { attributeAlias: string; value: string }[] = JSON.parse(data.trim());
  return numericValues.map((item) => ({ ...item, value: Number(item.value) }));
};

const getSelectableValues = (data: string) => {
  const selectableValues: string[] = JSON.parse(data.trim());
  return selectableValues.map((item) => Number(item));
};
