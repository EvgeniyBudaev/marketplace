import { forwardRef, useMemo } from "react";
import type { ForwardedRef, ReactElement } from "react";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import type { VisibilityState } from "@tanstack/react-table";
import clsx from "clsx";
import isNil from "lodash/isNil";
import { DEFAULT_PAGE_SIZE, DEFAULT_PAGE_SIZE_LIST } from "~/constants";
import { Control } from "~/uikit/Table/Control";
import { NavigationPanel, navigationPanelLinks } from "~/uikit/Table/NavigationPanel";
import { TableBody, tableBodyLinks } from "~/uikit/Table/TableBody";
import { optionsLinks } from "~/uikit/Table/Options";
import { TableHeader, tableHeaderLinks } from "~/uikit/Table/TableHeader";
import type { TTableProps } from "~/uikit/Table/types";
import { tableHeaderItemLinks } from "./TableHeaderItem";
import styles from "./Table.module.css";

const TableComponent = <TColumn extends Record<string, any>>(
  props: TTableProps<TColumn>,
  ref: ForwardedRef<HTMLDivElement>,
): ReactElement => {
  const data = useMemo(() => props.data, [props.data]);
  const {
    className,
    columns,
    currentPage,
    debug,
    defaultPageSize,
    pagesCount,
    sorting,
    onChangePageSize,
    onPageChange,
    onRowSelectionChange,
    pageSizeOptions,
    rowSelection,
    settings,
    totalItems,
    totalItemsTitle,
  } = props;

  const hiddenColumns = settings?.options?.hiddenColumns;

  const columnVisibility = useMemo<VisibilityState | undefined>(
    () =>
      hiddenColumns?.reduce((acc, item) => {
        acc[item] = false;

        return acc;
      }, {} as VisibilityState),
    [hiddenColumns],
  );

  const table = useReactTable({
    data,
    state: {
      columnVisibility,
      rowSelection,
    },
    columns,
    onRowSelectionChange,
    getCoreRowModel: getCoreRowModel(),
    getRowId: props.getId ?? ((row) => row.id),
    debugTable: debug,
  });

  return (
    <div ref={ref}>
      <div className="Table-Head">
        <div>
          {" "}
          {totalItemsTitle}&nbsp;<span className="Table-HeadCount">{totalItems}</span>
        </div>
        <div>{settings && <Control {...settings} columns={table.getAllLeafColumns()} />}</div>
      </div>
      <div className="Table-Scroll">
        <table className={clsx("Table", className)}>
          <TableHeader<TColumn>
            headerGroups={table.getHeaderGroups()}
            hiddenColumns={settings?.options?.hiddenColumns}
            optionsSorting={settings?.options?.optionsSorting}
            setHiddenColumns={settings?.options?.setHiddenColumns}
            sorting={sorting}
          />
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
    ...optionsLinks(),
    ...tableBodyLinks(),
    ...tableHeaderLinks(),
    ...tableHeaderItemLinks(),
  ];
}
