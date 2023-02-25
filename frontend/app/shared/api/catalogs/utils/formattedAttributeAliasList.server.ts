import type { TSelectOption } from "~/uikit";

export const formattedAttributeAliasList = (options: TSelectOption | TSelectOption[]) => {
  if (Array.isArray(options)) {
    return options.map((item) => item.value);
  } else {
    return Array.from(new Set(options.value));
  }
};
