import { ForwardedRef, forwardRef, memo, PropsWithChildren, ReactElement, useMemo } from "react";
import { Column, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import clsx from "clsx";
import { Pagination } from "~/uikit";
import { SortingIcon, sortingIconLinks } from "./SortingIcon";
import { TTableProps } from "~/uikit/Table/types";
import styles from "./Table.module.css";

// export type SortingType = IdType<string> | `-${IdType<string>}`;
// export type TableSortingType = { [key: string]: SortingType };

const TableComponent = <TColumn extends Record<string, any>>(
  props: TTableProps<TColumn>,
  ref: ForwardedRef<HTMLDivElement>,
): ReactElement => {
  const data = useMemo(() => props.data, [props.data]);
  const {
    className,
    columns,
    currentPage,
    pagesCount,
    searchedKeyword,
    sorting,
    isSearch,
    onPageChange,
    onRowSelectionChange,
    onSearchChange,
    onSort,
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

  // const getNewSort = (
  //     currentSort: SortingType,
  //     key: string
  // ): string | undefined => {
  //     switch (currentSort) {
  //         case `-${key}`:
  //             return undefined;
  //         case key:
  //             return `-${key}`;
  //         default:
  //             return key;
  //     }
  // };

  // const handleSortClick = (column: Column) => {
  //     const columnId = column.id;
  //     if (columnId) {
  //         // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //         // @ts-ignore
  //         const newSort = getNewSort(sorting?.[columnId], columnId);
  //         onSort && onSort({ [columnId]: newSort as SortingType });
  //     }
  // };

  return (
    <div ref={ref}>
      {/*{isSearch && (*/}
      {/*    <Search*/}
      {/*        searchedKeyword={searchedKeyword}*/}
      {/*        onSearchChange={onSearchChange}*/}
      {/*    />*/}
      {/*)}*/}
      <div className="Table-Header">
        {totalItemsTitle}&nbsp;<span className="Table-HeaderCount">{totalItems}</span>
      </div>
      <table className={clsx("Table", className)}>
        <thead className="Table-THead">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr className="Table-TR" key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  className="Table-TH"
                  key={header.id}
                  style={{
                    position: "relative",
                    width: header.getSize(),
                    maxWidth: header.getSize(),
                  }}
                >
                  <div
                    className="Table-THInner"
                    // onClick={() => handleSortClick(header)}
                  >
                    <div className="Table-THText">
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </div>
                    {/*<>*/}
                    {/*    {column.canSort && (*/}
                    {/*        <div className="Table-SortingIcon">*/}
                    {/*            <SortingIcon*/}
                    {/*                sort={sorting?.[column.id]}*/}
                    {/*                sortVariant={column.id}*/}
                    {/*            />*/}
                    {/*        </div>*/}
                    {/*    )}*/}
                    {/*</>*/}
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="Table-TBody">
          {table.getRowModel().rows.map((row) => {
            return (
              <tr className="Table-TR" key={row.id}>
                {row.getVisibleCells().map((cell) => {
                  return (
                    <td
                      className="Table-TD"
                      key={cell.id}
                      style={{ width: cell.column.getSize(), maxWidth: cell.column.getSize() }}
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      {currentPage && pagesCount && onPageChange && (
        <Pagination initialPage={currentPage - 1} pagesCount={pagesCount} onChange={onPageChange} />
      )}
    </div>
  );
};

export const Table = forwardRef(TableComponent) as typeof TableComponent;

export function tableLinks() {
  return [{ rel: "stylesheet", href: styles }, ...sortingIconLinks()];
}