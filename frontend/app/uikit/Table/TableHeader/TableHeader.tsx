import { useState } from "react";
import { flexRender } from "@tanstack/react-table";
import type { HeaderGroup } from "@tanstack/react-table";
import clsx from "clsx";
import type { TTableSortingProps } from "~/uikit";
import { Sorting } from "~/uikit/Table/Sorting";
import { getInitialSortingColumnState } from "~/uikit/Table/TableHeader/utils";
import type { TSortingColumnStateWithReset } from "~/uikit/Table/TableHeader";
import styles from "./TableHeader.module.css";

type TProps<TColumn extends object> = {
  headerGroups: HeaderGroup<TColumn>[];
  sorting?: TTableSortingProps;
};

export const TableHeader = <T extends object>({ headerGroups, sorting }: TProps<T>) => {
  const [sortingState, setSortingState] = useState<
    TSortingColumnStateWithReset | Array<TSortingColumnStateWithReset> | null
  >(getInitialSortingColumnState(sorting));

  const handleChangeSorting = (
    value: TSortingColumnStateWithReset | Array<TSortingColumnStateWithReset> | null,
  ) => {
    if (!value) {
      setSortingState(null);
      sorting?.onChangeSorting();
      return;
    }

    if (Array.isArray(value) && sorting?.multiple) {
      setSortingState(value);
      sorting?.onChangeSorting(
        value.map((item) => ({
          sortProperty: item.sortProperty,
          sortDirection: item.sortDirection,
        })),
      );
      return;
    }

    const { sortDirection, sortProperty } = value as TSortingColumnStateWithReset;
    setSortingState(value as TSortingColumnStateWithReset);
    sorting?.onChangeSorting({
      sortProperty,
      sortDirection,
    });
  };

  return (
    <thead className="TableHeader-THead">
      {headerGroups.map((headerGroup) => (
        <tr className="TableHeader-TR" key={headerGroup.id}>
          {headerGroup.headers.map((header) => {
            const hasSorting = sorting?.columns.includes(header.id);

            return (
              <th
                className="TableHeader-TH"
                key={header.id}
                style={{
                  position: "relative",
                  width: header.getSize(),
                  maxWidth: header.getSize(),
                }}
              >
                <div
                  className={clsx("TableHeader-THInner", {
                    "TableHeader-THInner__sorting": hasSorting,
                  })}
                >
                  <>
                    {hasSorting && (
                      <div className="Table-SortingIcon">
                        <Sorting
                          header={header}
                          multiple={sorting?.multiple}
                          onChange={handleChangeSorting}
                          state={sortingState}
                        />
                      </div>
                    )}
                    {!hasSorting && header.isPlaceholder && null}
                    {!hasSorting && !header.isPlaceholder && (
                      <div className="TableHeader-THText">
                        {flexRender(header.column.columnDef.header, header.getContext())}
                      </div>
                    )}
                  </>
                </div>
              </th>
            );
          })}
        </tr>
      ))}
    </thead>
  );
};

export function tableHeaderLinks() {
  return [{ rel: "stylesheet", href: styles }];
}
