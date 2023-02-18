import { memo } from "react";
import type { FC } from "react";
import clsx from "clsx";
import { ETableSortDirection, Icon, IconButton } from "~/uikit";
import type { TSortingColumnStateWithReset } from "~/uikit/Table/TableHeader";
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
      {isAlreadySorted ? (
        <>
          <IconButton
            typeIcon={
              sortingState.sortDirection === ETableSortDirection.Asc
                ? "ArrowDropUp"
                : "ArrowDropUpStroke"
            }
            onClick={() =>
              handleChange(
                headerId,
                sortingState.sortDirection === ETableSortDirection.Asc
                  ? ETableSortDirection.Desc
                  : ETableSortDirection.Asc,
                true,
              )
            }
          />
          <IconButton
            typeIcon={
              sortingState.sortDirection === ETableSortDirection.Desc
                ? "ArrowDropDown"
                : "ArrowDropDownStroke"
            }
            onClick={() =>
              handleChange(
                headerId,
                sortingState.sortDirection === ETableSortDirection.Asc
                  ? ETableSortDirection.Desc
                  : ETableSortDirection.Asc,
                true,
              )
            }
          />
        </>
      ) : (
        <>
          <Icon
            type={"ArrowDropUp"}
            onClick={() => handleChange(headerId, ETableSortDirection.Asc)}
          />
          <Icon
            type={"ArrowDropDown"}
            onClick={() => handleChange(headerId, ETableSortDirection.Desc)}
          />
        </>
      )}
    </div>
  );
};

export const SortingIcon = memo(SortingIconComponent);

export function sortingIconLinks() {
  return [{ rel: "stylesheet", href: styles }];
}
