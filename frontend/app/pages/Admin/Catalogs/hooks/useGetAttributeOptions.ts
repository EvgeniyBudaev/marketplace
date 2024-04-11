import type { TAttributes } from "#app/shared/api/attributes";

type TUseGetCatalogAlias = ({ attributes }: { attributes: TAttributes }) => {
  attributeOptions: { value: string; label: string }[];
};

export const useGetAttributeOptions: TUseGetCatalogAlias = ({ attributes }) => {
  const attributeOptions = attributes.content.map((item) => {
    return {
      value: item.alias,
      label: item.name,
    };
  });

  return { attributeOptions };
};
