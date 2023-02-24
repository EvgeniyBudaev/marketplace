import type { TParams } from "~/types";
import type { TSelectOption } from "~/uikit";

export const mapAddCatalogToDto = (params: TParams) => {
  return {
    ...params,
    attributeAlias: params?.attributeAlias
      ? formattedAttributeAliasList(params.attributeAlias)
      : null,
    enabled: params?.enabled ? Boolean(params.enabled) : null,
  };
};

const formattedAttributeAliasList = (options: TSelectOption | TSelectOption[]) => {
  if (Array.isArray(options)) {
    return options.map((item) => item.value);
  } else {
    return Array.from(new Set(options.value));
  }
};
