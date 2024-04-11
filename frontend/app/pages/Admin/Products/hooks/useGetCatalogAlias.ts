import type { TCatalogs } from "#app/shared/api/catalogs";

type TUseGetCatalogAlias = ({ catalogs }: { catalogs: TCatalogs }) => {
  catalogAliasesTypeOptions: { value: string; label: string }[];
};

export const useGetCatalogAlias: TUseGetCatalogAlias = ({ catalogs }) => {
  const catalogAliasesTypeOptions = catalogs.content.map((item) => {
    return {
      value: item.alias,
      label: item.name,
    };
  });

  return { catalogAliasesTypeOptions };
};
