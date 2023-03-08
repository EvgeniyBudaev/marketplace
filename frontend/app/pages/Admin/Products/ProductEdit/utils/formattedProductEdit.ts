import type { TParams } from "~/types";

const isNumeric = (key: string, value?: string | number | null | TParams): boolean => {
  if (key === "count" || key === "price") return false;
  if (typeof value === "string") {
    return !isNaN(Number(value)) && !isNaN(parseFloat(value));
  } else return typeof value === "number";
};

const isSelectableValue = (
  key: string,
  val?: string | number | null | TParams | { value: string; label: string },
): boolean => {
  // @ts-ignore
  return key !== "catalogAlias" && isNumeric(key, val?.value ?? null);
};

export const formattedProductEdit = (params: TParams) => {
  const numericValues: { attributeAlias: string; value: string }[] = [];
  const selectableValues: string[] = [];
  return Object.entries(params).reduce((newObj, [key, val]) => {
    if (isNumeric(key, val)) {
      numericValues.push({ attributeAlias: key, value: val });
    }
    if (isSelectableValue(key, val)) {
      selectableValues.push(val.value);
    }
    return isNumeric(key, val)
      ? { ...newObj, numericValues }
      : isSelectableValue(key, val)
      ? { ...newObj, selectableValues }
      : { ...newObj, [key]: val };
  }, {});
};
