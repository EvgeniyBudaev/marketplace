import { useEffect, useState } from "react";
import type { FC } from "react";
import type { OnChangeValue } from "react-select";
import { Form } from "@remix-run/react";
import clsx from "clsx";
import isNil from "lodash/isNil";
import { useTheme } from "~/hooks";
import { EFormMethods } from "~/shared/form";
import type { TSorting } from "~/types";
import { ETypographyVariant, Select, Typography } from "~/uikit";
import type { isSelectMultiType, TSelectOption } from "~/uikit";
import styles from "./Sorting.module.css";

type TProps = {
  onSortingChange?: (data: TSorting["value"]) => void;
  sorting: TSorting["value"];
};

export const Sorting: FC<TProps> = ({ onSortingChange, sorting }) => {
  const PRICE_UP = "по возрастанию цены";
  const PRICE_DOWN = "по убыванию цены";

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
        <Typography variant={ETypographyVariant.TextB3Regular}>Сортировать</Typography>
      </span>
      <Form method={EFormMethods.Get}>
        <Select
          className={clsx("Sorting-Select", {
            "Sorting-Select__active": isSelectOpened,
          })}
          isMulti={false}
          options={options}
          theme={theme}
          value={options.find((option) => option.value === sorting)!}
          onBlur={handleBlur}
          onChange={handleChange}
          onFocus={handleFocus}
        />
      </Form>
    </div>
  );
};

export function sortingLinks() {
  return [{ rel: "stylesheet", href: styles }];
}
