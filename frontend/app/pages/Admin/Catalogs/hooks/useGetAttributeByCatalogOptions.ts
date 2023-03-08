import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";
import type { TAttributesByCatalog } from "~/shared/api/attributes";

type TUseGetCatalogAlias = ({
  attributesByCatalog,
}: {
  attributesByCatalog: TAttributesByCatalog;
}) => {
  attributeByCatalogOptions: { value: string; label: string }[];
};

export const useGetAttributeByCatalogOptions: TUseGetCatalogAlias = ({ attributesByCatalog }) => {
  const selectableAttributeList =
    !isNil(attributesByCatalog.selectableAttribute) &&
    !isEmpty(attributesByCatalog.selectableAttribute)
      ? attributesByCatalog.selectableAttribute.map((item) => {
          return {
            value: item.alias,
            label: item.name,
          };
        })
      : [];

  const numberAttributeList =
    !isNil(attributesByCatalog.numberAttribute) && !isEmpty(attributesByCatalog.numberAttribute)
      ? attributesByCatalog.numberAttribute.map((item) => {
          return {
            value: item.attributeAlias,
            label: item.name,
          };
        })
      : [];

  const attributeByCatalogOptions = [...selectableAttributeList, ...numberAttributeList];

  return { attributeByCatalogOptions };
};
