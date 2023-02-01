import { useEffect, useState } from "react";
import type { FC } from "react";
import { Form } from "@remix-run/react";
import clsx from "clsx";
import isNull from "lodash/isNull";
import { selectStyles } from "~/pages/Catalog/Sorting/selectStyles";
import { EFormMethods } from "~/shared/form";
import type { TSorting } from "~/types";
import { ETypographyVariant, Select, Typography } from "~/uikit";
import styles from "./Sorting.module.css";
import { useSettings } from "~/hooks";
import { ETheme } from "~/enums";

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

  const settings = useSettings();
  const theme = settings.settings.theme;
  console.log("settings: ", settings);

  const [isSelectOpened, setIsSelectOpened] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (selectedOption: TSorting | null) => {
    if (isNull(selectedOption)) return;

    onSortingChange?.(selectedOption.value);
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
          id="1"
          instanceId="1"
          options={options}
          styles={selectStyles(theme === ETheme.Light ? "primary" : "secondary")}
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
