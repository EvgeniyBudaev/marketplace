import type { TSelectOption } from "#app/uikit";

export const formattedAttributeAliasList = (
  options: TSelectOption | TSelectOption[]
) => {
  if (Array.isArray(options)) {
    return options.map((item) => item.value);
  } else {
    return [options.value];
  }
};
