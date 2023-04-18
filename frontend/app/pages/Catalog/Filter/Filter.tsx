import type { ChangeEvent, FC } from "react";
import { useTranslation } from "react-i18next";
import { Form } from "@remix-run/react";
import isNil from "lodash/isNil";
import { TRANSITION } from "~/constants";
import type { TCatalogDetail, TCatalogSelectAttributeItem } from "~/shared/api/catalogs";
import { EFormMethods } from "~/shared/form";
import type { TParams } from "~/types";
import { Accordion, Button, Checkbox, ETypographyVariant, Overlay, Typography } from "~/uikit";
import styles from "./Filter.module.css";

type TValue = {
  [key: string]: string[];
};

type TProps = {
  catalog: TCatalogDetail;
  onFilterChange?: (params: TParams) => void;
  onFilterSubmit?: () => void;
  filter: TParams;
};

export const getDefaultFilter = (
  catalog: TCatalogDetail,
  searchParams: URLSearchParams,
): TParams => {
  const mapToInitialState = (
    attributes?: TCatalogSelectAttributeItem[] | null,
  ): { [key: string]: string[] } => {
    if (isNil(attributes)) {
      return {};
    }
    return attributes.reduce((acc, item) => {
      const all = searchParams.getAll(item.alias);
      return { ...acc, [item.alias]: all.length > 0 ? all : [] };
    }, {});
  };

  const attributes =
    catalog.selectAttribute &&
    catalog.selectAttribute.filter((attribute) =>
      attribute.values ? attribute.values.length > 0 : [],
    );
  return mapToInitialState(attributes);
};

export const Filter: FC<TProps> = ({ catalog, onFilterChange, onFilterSubmit, filter }) => {
  const { t } = useTranslation();
  const attributes =
    catalog.selectAttribute &&
    catalog.selectAttribute.filter((attribute) =>
      attribute.values ? attribute.values.length > 0 : [],
    );

  const onChangeCheckedBox = (
    event: ChangeEvent<HTMLInputElement>,
    id: string,
    nameGroup: string,
  ) => {
    const {
      target: { checked, value },
    } = event;

    if (checked) {
      onFilterChange?.({
        ...filter,
        [nameGroup]: [...filter[nameGroup], value],
      });
    } else {
      onFilterChange?.({
        ...filter,
        [nameGroup]: [...filter[nameGroup].filter((x: string) => x !== value)],
      });
    }
  };

  const handleSubmit = () => {
    onFilterSubmit?.();
  };

  return (
    <aside className="Filter">
      <Overlay timeout={TRANSITION} onClick={() => {}} isActive={false} />
      <Form className="Filter-AsideFilterDesktop" method={EFormMethods.Get} onSubmit={handleSubmit}>
        {attributes &&
          attributes.map((item) => (
            <Accordion key={item.alias} title={item.name} isActive={true}>
              {item.values &&
                item.values.map((valueItem, index) => (
                  <Checkbox
                    checked={
                      filter && filter[item.alias as keyof TValue].includes(valueItem.id.toString())
                    }
                    className="Filter-CheckboxItem"
                    id={valueItem.id.toString()}
                    label={valueItem.value}
                    key={index}
                    name={item.alias}
                    nameGroup={item.alias}
                    onChange={(event, id, nameGroup) => onChangeCheckedBox(event, id, nameGroup)}
                  />
                ))}
            </Accordion>
          ))}
        <Button type="submit">
          <Typography variant={ETypographyVariant.TextB3Regular}>
            {t("common.actions.apply")}
          </Typography>
        </Button>
      </Form>
    </aside>
  );
};

export function filterLinks() {
  return [{ rel: "stylesheet", href: styles }];
}
