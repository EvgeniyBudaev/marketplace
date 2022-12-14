import { useEffect, useState } from "react";
import type { FC } from "react";
import clsx from "clsx";
import isNull from "lodash/isNull";
import { Select } from "~/uikit";
import { selectStyles } from "~/pages/Catalog/Sorting/selectStyles";
import styles from "./Sorting.module.css";

type TSorting = {
  value: string;
  label: string;
};

export const Sorting: FC = () => {
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

  const handleSorting = (selectedOption: TSorting) => {
    //return { ...router.query, ordering: selectedOption.value, page: 1 };
  };

  const handleChange = (selectedOption: TSorting | null) => {
    if (isNull(selectedOption)) return;
    console.log("selectedOption: ", selectedOption);
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

    // async function fetchSorting(request) {
    //     await router.push({
    //         href: path,
    //         query: handleSorting(request),
    //     });
    //     onFirstPage();
    // }
    setIsSubmitting((prevState) => !prevState);

    //fetchSorting(selectedOption);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmitting]);

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
  );
};

export function sortingLinks() {
  return [{ rel: "stylesheet", href: styles }];
}
