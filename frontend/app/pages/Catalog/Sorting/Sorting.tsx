import { useEffect, useState } from "react";
import type { FC } from "react";
import type { OnChangeValue } from "react-select";
import { useTranslation } from "react-i18next";
import { Form } from "@remix-run/react";
import clsx from "clsx";
import isNil from "lodash/isNil";

import { useTheme } from "~/hooks";
import { EFormMethods } from "~/shared/form";
import type { TSorting } from "~/types";
import { ETypographyVariant, Select, Typography } from "~/uikit";
import type { isSelectMultiType, TSelectOption } from "~/uikit";
import styles from "./Sorting.css";

type TProps = {
  onSortingChange?: (data: TSorting["value"]) => void;
  sorting: TSorting["value"];
};

export const Sorting: FC<TProps> = ({ onSortingChange, sorting }) => {
  const { t } = useTranslation();
  const PRICE_UP = t("pages.catalog.sorting.asc");
  const PRICE_DOWN = t("pages.catalog.sorting.desc");

  const options = [
    { value: "price_asc", label: PRICE_UP },
    { value: "price_desc", label: PRICE_DOWN },
  ];

  const { theme } = useTheme();

  const [isSelectOpened, setIsSelectOpened] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (selectedOption?: OnChangeValue<TSelectOption, isSelectMultiType>) => {
    if (isNil(selectedOption)) return;
    if (Array.isArray(selectedOption)) {
      onSortingChange?.(selectedOption[0].value);
    } else {
      const selectedOptionSingle = selectedOption as TSelectOption;
      onSortingChange?.(selectedOptionSingle.value);
    }
    setIsSubmitting((prevState) => !prevState);
  };

  const handleBlur = () => {
    setIsSelectOpened(false);
  };

  const handleFocus = () => {
    setIsSelectOpened(true);
  };

  useEffect(() => {
    if (!isSubmitting) return;

    setIsSubmitting((prevState) => !prevState);
  }, [isSubmitting, setIsSubmitting]);

  return (
    <div className="Sorting">
      <span className="Sorting-Label">
        <Typography variant={ETypographyVariant.TextB3Regular}>
          {t("common.actions.sort")}
        </Typography>
      </span>
      <Form method={EFormMethods.Get}>
        <Select
          className={clsx("Sorting-Select", {
            "Sorting-Select__active": isSelectOpened,
          })}
          isMulti={false}
          onBlur={handleBlur}
          onChange={handleChange}
          onFocus={handleFocus}
          options={options}
          theme={theme}
          value={options.find((option) => option.value === sorting)!}
        />
      </Form>
    </div>
  );
};

export function sortingLinks() {
  return [{ rel: "stylesheet", href: styles }];
}
