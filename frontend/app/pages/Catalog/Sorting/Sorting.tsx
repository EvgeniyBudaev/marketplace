import { useEffect, useState } from "react";
import type { FC } from "react";
import { Form } from "@remix-run/react";
import clsx from "clsx";
import isNull from "lodash/isNull";
import { selectStyles } from "~/pages/Catalog/Sorting/selectStyles";
import {EFormMethods} from "~/shared/form";
import {TSorting} from "~/types";
import { Select } from "~/uikit";
import styles from "./Sorting.module.css";

type TProps = {
  onSorting: (data?: TSorting) => void;
};

export const Sorting: FC<TProps> = ({onSorting}) => {
  const PRICE_UP = "по возрастанию цены";
  const PRICE_DOWN = "по убыванию цены";
  const options = [
    { value: "price_asc", label: PRICE_UP },
    { value: "price_desc", label: PRICE_DOWN },
  ];

  const [isSelectOpened, setIsSelectOpened] = useState(false);
  const [selectedOption, setSelectedOption] = useState<TSorting>({
    value: "price_asc",
    label: PRICE_UP,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (selectedOption: TSorting | null) => {
    if (isNull(selectedOption)) return;
    setSelectedOption(selectedOption);
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
    onSorting(selectedOption);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmitting]);

  const handleSubmit = (e: any) => {
    console.log("handleSubmit: ", e);
  };

  return (
      <div className="Sorting">
        <span className="Sorting-Label">Сортировать</span>
        <Select
            className={clsx("Sorting-Select", {
              "Sorting-Select__active": isSelectOpened,
            })}
            id="1"
            instanceId="1"
            options={options}
            styles={selectStyles}
            value={selectedOption}
            onBlur={handleBlur}
            onChange={handleChange}
            onFocus={handleFocus}
        />
      </div>
    // <Form className="Sorting" method={EFormMethods.Get} onSubmit={handleSubmit}>
    //   <span className="Sorting-Label">Сортировать</span>
    //   <Select
    //     className={clsx("Sorting-Select", {
    //       "Sorting-Select__active": isSelectOpened,
    //     })}
    //     id="1"
    //     instanceId="1"
    //     options={options}
    //     styles={selectStyles}
    //     value={selectedOption}
    //     onBlur={handleBlur}
    //     onChange={handleChange}
    //     onFocus={handleFocus}
    //   />
    // </Form>
  );
};

export function sortingLinks() {
  return [{ rel: "stylesheet", href: styles }];
}
