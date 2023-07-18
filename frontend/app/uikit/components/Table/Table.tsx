import React, { forwardRef, useCallback, useEffect, useMemo, useRef } from "react";
import type { ForwardedRef, ReactElement } from "react";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import type { VisibilityState } from "@tanstack/react-table";
import clsx from "clsx";
import isNil from "lodash/isNil";
import { DEFAULT_PAGE_SIZE, DEFAULT_PAGE_SIZE_LIST } from "~/constants";
import { Control } from "~/uikit/components/Table/Control";
import { ETablePlacement } from "~/uikit/components/Table/enums";
import { NavigationPanel, navigationPanelLinks } from "~/uikit/components/Table/NavigationPanel";
import { TableBody, tableBodyLinks } from "~/uikit/components/Table/TableBody";
import { optionsLinks } from "~/uikit/components/Table/Options";
import { TableHeader, tableHeaderLinks } from "~/uikit/components/Table/TableHeader";
import { TableLoader, tableLoaderLinks } from "~/uikit/components/Table/TableLoader";
import type { TTableProps } from "~/uikit/components/Table/types";
import { tableHeaderItemLinks } from "./TableHeaderItem";
import styles from "./Table.css";

const TableComponent = <TColumn extends Record<string, any>>(
  props: TTableProps<TColumn>,
  ref: ForwardedRef<HTMLDivElement>,
): ReactElement => {
  const data = useMemo(() => props.data, [props.data]);
  const {
    className,
    columns,
    currentPage,
    dataTestId = "uikit__table",
    debug,
    defaultPageSize,
    isLoading = false,
    onChangePageSize,
    onPageChange,
    onRowSelectionChange,
    pagesCount,
    pageSizeOptions,
    rowActions,
    rowSelection,
    settings,
    sorting,
    theme,
    totalItems,
    totalItemsTitle,
  } = props;
  const hiddenColumns = settings?.options?.hiddenColumns;
  const tableRef = useRef<HTMLTableElement>(null);
  const loaderRef = useRef<HTMLDivElement>(null);

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

  const updateSpinnerPosition = useCallback(() => {
    if (!tableRef.current || !loaderRef.current) {
      return;
    }

    const boundingRect = tableRef.current.getBoundingClientRect();
    const visibleTop = Math.max(0, Math.min(window.innerHeight, boundingRect.y));
    const visibleBottom = Math.max(0, Math.min(window.innerHeight, boundingRect.bottom));

    const top = (visibleTop + visibleBottom) / 2 - boundingRect.y;

    loaderRef.current.style.top = `${top}px`;
  }, [tableRef, loaderRef]);

  useEffect(() => {
    document.addEventListener("scroll", updateSpinnerPosition);
    return () => document.removeEventListener("scroll", updateSpinnerPosition);
  }, [updateSpinnerPosition]);

  useEffect(() => {
    updateSpinnerPosition();
  });

  return (
    <div data-testid={dataTestId} ref={ref}>
      <NavigationPanel
        className="Table-NavigationPanel__top"
        currentPage={currentPage}
        defaultPageSize={!isNil(defaultPageSize) ? defaultPageSize : DEFAULT_PAGE_SIZE}
        dropdownPosition={ETablePlacement.Bottom}
        onChangePageSize={(pageSize: number) => onChangePageSize?.(pageSize)}
        onPageChange={onPageChange}
        pagesCount={pagesCount}
        pageSizeOptions={!isNil(pageSizeOptions) ? pageSizeOptions : DEFAULT_PAGE_SIZE_LIST}
        theme={theme}
      />
      <div className="Table-Head">
        <div>
          {" "}
          {totalItemsTitle}&nbsp;<span className="Table-HeadCount">{totalItems}</span>
        </div>
        <div>{settings && <Control {...settings} columns={table.getAllLeafColumns()} />}</div>
      </div>
      <div className="Table-Scroll">
        {isLoading && <TableLoader ref={loaderRef} />}
        <table ref={tableRef} className={clsx("Table", className)}>
          <TableHeader<TColumn>
            headerGroups={table.getHeaderGroups()}
            hiddenColumns={settings?.options?.hiddenColumns}
            optionsSorting={settings?.options?.optionsSorting}
            setHiddenColumns={settings?.options?.setHiddenColumns}
            sorting={sorting}
          />
          <TableBody rowActions={rowActions} rows={table.getRowModel().rows} />
          {/*<TableBody ref={tableBodyRef} rows={table.getRowModel().rows} />*/}
        </table>
      </div>
      <NavigationPanel
        currentPage={currentPage}
        defaultPageSize={!isNil(defaultPageSize) ? defaultPageSize : DEFAULT_PAGE_SIZE}
        dropdownPosition={ETablePlacement.Top}
        onChangePageSize={(pageSize: number) => onChangePageSize?.(pageSize)}
        onPageChange={onPageChange}
        pagesCount={pagesCount}
        pageSizeOptions={!isNil(pageSizeOptions) ? pageSizeOptions : DEFAULT_PAGE_SIZE_LIST}
        theme={theme}
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
    ...tableLoaderLinks(),
  ];
}