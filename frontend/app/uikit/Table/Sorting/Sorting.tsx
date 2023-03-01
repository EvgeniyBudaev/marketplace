import type { ReactElement } from "react";
import { flexRender } from "@tanstack/react-table";
import type { Header } from "@tanstack/react-table";
import clsx from "clsx";
import { ETableSortDirection, Icon, IconButton, Popover } from "~/uikit";
import type { TSortingColumnStateWithReset } from "~/uikit/Table/TableHeader";
import styles from "./Sorting.module.css";

type TProps<T extends object> = {
  className?: string;
  header: Header<T, unknown>;
  multiple?: boolean;
  onChange: (
    value: TSortingColumnStateWithReset | Array<TSortingColumnStateWithReset> | null,
  ) => void;
  state: TSortingColumnStateWithReset | Array<TSortingColumnStateWithReset> | null;
};

export const Sorting = <T extends object>({
  className,
  header,
  multiple,
  onChange,
  state,
}: TProps<T>): ReactElement => {
  const headerId = header.id;
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

  const renderIconIndicator = () => {
    if (isAlreadySorted && sortingState.sortDirection === ETableSortDirection.Asc) {
      return (
        <div>
          <Icon type="SortUp" />
        </div>
      );
    } else if (isAlreadySorted && sortingState.sortDirection === ETableSortDirection.Desc) {
      return (
        <div>
          <Icon type="SortDown" />
        </div>
      );
    } else {
      return (
        <div>
          <Icon type="Sorting" />
        </div>
      );
    }
  };

  return (
    <div className={clsx("Sorting", className)}>
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
          <Popover>
            <Popover.Button>
              <div className="Sorting-ButtonText">
                {header.isPlaceholder
                  ? null
                  : flexRender(header.column.columnDef.header, header.getContext())}
              </div>
              {renderIconIndicator()}
            </Popover.Button>
            <Popover.Panel>
              <ul>
                <li>Сортировать по возрастанию</li>
                <li>Сортировать по убыванию</li>
              </ul>
            </Popover.Panel>
          </Popover>
          {/*<Icon*/}
          {/*  type={"ArrowDropUp"}*/}
          {/*  onClick={() => handleChange(headerId, ETableSortDirection.Asc)}*/}
          {/*/>*/}
          {/*<Icon*/}
          {/*  type={"ArrowDropDown"}*/}
          {/*  onClick={() => handleChange(headerId, ETableSortDirection.Desc)}*/}
          {/*/>*/}
        </>
      )}
    </div>
  );
};

export function sortingLinks() {
  return [{ rel: "stylesheet", href: styles }];
}
