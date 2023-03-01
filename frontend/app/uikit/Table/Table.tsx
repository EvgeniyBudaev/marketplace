import { forwardRef, useMemo } from "react";
import type { ForwardedRef, ReactElement } from "react";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import clsx from "clsx";
import isNil from "lodash/isNil";
import { DEFAULT_PAGE_SIZE, DEFAULT_PAGE_SIZE_LIST } from "~/constants";
import { NavigationPanel, navigationPanelLinks } from "~/uikit/Table/NavigationPanel";
import type { TTableProps } from "~/uikit/Table/types";
import { TableHeader, tableHeaderLinks } from "~/uikit/Table/TableHeader";
import { sortingLinks } from "./Sorting";
import styles from "./Table.module.css";
import { TableBody, tableBodyLinks } from "~/uikit/Table/TableBody";

const TableComponent = <TColumn extends Record<string, any>>(
  props: TTableProps<TColumn>,
  ref: ForwardedRef<HTMLDivElement>,
): ReactElement => {
  const data = useMemo(() => props.data, [props.data]);
  const {
    className,
    columns,
    currentPage,
    defaultPageSize,
    pagesCount,
    sorting,
    onChangePageSize,
    onPageChange,
    onRowSelectionChange,
    pageSizeOptions,
    rowSelection,
    totalItems,
    totalItemsTitle,
  } = props;

  const table = useReactTable({
    data,
    state: {
      rowSelection,
    },
    columns,
    onRowSelectionChange,
    getCoreRowModel: getCoreRowModel(),
    getRowId: props.getId ?? ((row) => row.id),
  });

  return (
    <div ref={ref}>
      <div className="Table-Header">
        {totalItemsTitle}&nbsp;<span className="Table-HeaderCount">{totalItems}</span>
      </div>
      <div className="Table-Scroll">
        <table className={clsx("Table", className)}>
          <TableHeader<TColumn> headerGroups={table.getHeaderGroups()} sorting={sorting} />
          <TableBody rows={table.getRowModel().rows} />
        </table>
      </div>
      <NavigationPanel
        currentPage={currentPage}
        defaultPageSize={!isNil(defaultPageSize) ? defaultPageSize : DEFAULT_PAGE_SIZE}
        onChangePageSize={(pageSize: number) => onChangePageSize?.(pageSize)}
        onPageChange={onPageChange}
        pagesCount={pagesCount}
        pageSizeOptions={!isNil(pageSizeOptions) ? pageSizeOptions : DEFAULT_PAGE_SIZE_LIST}
      />
    </div>
  );
};

export const Table = forwardRef(TableComponent) as typeof TableComponent;

export function tableLinks() {
  return [
    { rel: "stylesheet", href: styles },
    ...navigationPanelLinks(),
    ...sortingLinks(),
    ...tableBodyLinks(),
    ...tableHeaderLinks(),
  ];
}
