import { memo } from "react";
import type { FC } from "react";
import clsx from "clsx";
import { ETableSortDirection } from "~/uikit";
import { TSortingColumnStateWithReset } from "~/uikit/Table/TableHeader/types";
import styles from "./SortingIcon.module.css";

type TProps = {
  className?: string;
  state: TSortingColumnStateWithReset | Array<TSortingColumnStateWithReset> | null;
  onChange: (
    value: TSortingColumnStateWithReset | Array<TSortingColumnStateWithReset> | null,
  ) => void;
  multiple?: boolean;
  headerId: string;
};

const SortingIconComponent: FC<TProps> = ({ className, headerId, multiple, onChange, state }) => {
  const sortingState = multiple
    ? (state as Array<TSortingColumnStateWithReset>).find((item) => item.sortProperty === headerId)
    : (state as TSortingColumnStateWithReset);
  const isAlreadySorted = sortingState?.sortProperty === headerId;
  const hasColumnInArray = multiple && !!sortingState;

  const handleChange = (
    sortProperty: string,
    sortDirection: ETableSortDirection,
    shouldReset?: boolean,
  ) => {
    if (sortingState && sortProperty === sortingState.sortProperty && sortingState.shouldReset) {
      if (multiple) {
        onChange(
          (state as Array<TSortingColumnStateWithReset>).filter(
            (item) => item.sortProperty !== sortProperty,
          ),
        );
      } else {
        onChange(null);
      }

      return;
    }

    let preparedSortingParams: TSortingColumnStateWithReset | Array<TSortingColumnStateWithReset> =
      { sortProperty, sortDirection, shouldReset };

    if (multiple) {
      preparedSortingParams = hasColumnInArray
        ? (state as Array<TSortingColumnStateWithReset>).map((item) =>
            item.sortProperty === sortProperty
              ? { sortProperty, sortDirection, shouldReset }
              : item,
          )
        : (state as Array<TSortingColumnStateWithReset>).concat([
            { sortDirection, sortProperty, shouldReset },
          ]);
    }

    onChange(preparedSortingParams);
  };

  return (
    <div className={clsx("SortingIcon", className)}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" height="16px" width="16px">
        <polygon
          // fill={sort === sortVariant ? "#000" : "none"}
          fill="#000000"
          stroke="#000000"
          strokeWidth="2"
          strokeMiterlimit="10"
          points="16,5 24,13 8,13 "
          onClick={() => handleChange(headerId, ETableSortDirection.Asc)}
        />
        <polygon
          // fill={sort === `-${sortVariant}` ? "#000" : "none"}
          fill="#000000"
          stroke="#000000"
          strokeWidth="2"
          strokeMiterlimit="10"
          points="16,27 8,19 24,19 "
          onClick={() => handleChange(headerId, ETableSortDirection.Desc)}
        />
      </svg>
    </div>
  );
};

export const SortingIcon = memo(SortingIconComponent);

export function sortingIconLinks() {
  return [{ rel: "stylesheet", href: styles }];
}
