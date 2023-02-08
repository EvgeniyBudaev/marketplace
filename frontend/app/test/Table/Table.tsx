import * as React from "react";
import type { VisibilityState } from "@tanstack/react-table";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import clsx from "clsx";

import { DEFAULT_MESSAGES, THEME } from "./constants";
import { TableHeader } from "./Header";
import { TableBody } from "./Body";
import { TableLoader } from "./Loader";
import { Footer } from "./Footer";
import { NavigationPanel } from "./NavigationPanel";

import type { TTableMessages, TTableProps, TTheme } from "./types";

function TableComponent<TColumn extends Record<string, any>>(
  props: TTableProps<TColumn>,
  ref: React.ForwardedRef<HTMLDivElement>,
): React.ReactElement {
  const {
    data,
    dataTestId,
    columns,
    isLoading = false,
    pagination,
    sorting,
    classes,
    footer,
    rowSelection,
    onRowSelectionChange,
    debug,
  } = props;
  const {
    page = 0,
    onChangePage,
    onChangePageSize,
    hasPrev,
    hasNext,
    pageSize = 0,
    zeroBasedPageNumber = true,
    count,
  } = pagination ?? {};
  const hiddenColumns = footer?.options?.hiddenColumns;

  const columnVisibility = React.useMemo<VisibilityState | undefined>(
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
  const theme: TTheme = React.useMemo(() => THEME[props.theme || "default"], [props.theme]);
  const messages: TTableMessages = React.useMemo(
    () => ({ ...DEFAULT_MESSAGES, ...props.messages }),
    [props.messages],
  );

  const handleChangePrevPage = React.useCallback(() => {
    if (typeof page === "undefined" || page < 1) return;
    onChangePage?.(page - 1);
  }, [onChangePage, page]);

  const handleChangeNextPage = React.useCallback(() => {
    if (typeof page === "undefined") return;
    onChangePage?.(page + 1);
  }, [onChangePage, page]);

  // для zeroBasedPageNumber применяем +1, чтобы пагинация начиналась с 1, а не с 0
  const pageIndex = typeof page !== "undefined" && zeroBasedPageNumber ? page + 1 : page;

  return (
    <div>
      <div ref={ref} className={clsx(theme.root, classes?.root)}>
        {isLoading && <TableLoader />}

        <table className={clsx("w-full", theme.table, classes?.table)} data-testid={dataTestId}>
          <TableHeader<TColumn>
            headerGroups={table.getHeaderGroups()}
            theme={theme}
            classes={classes}
            sorting={sorting}
          />

          <TableBody<TColumn> rows={table.getRowModel().rows} theme={theme} classes={classes} />
        </table>
      </div>

      {footer && <Footer {...footer} columns={table.getAllLeafColumns()} />}

      {pagination && (
        <NavigationPanel
          canPreviousPage={hasPrev}
          canNextPage={hasNext}
          nextPage={handleChangeNextPage}
          previousPage={handleChangePrevPage}
          label={messages.pageSize}
          pageIndex={pageIndex}
          defaultPageSize={pageSize}
          setPageSize={(pageSize: number) => {
            onChangePageSize?.(pageSize);
          }}
          dropdownPosition="top"
          disabled={isLoading}
          pageCount={count && Math.ceil(count / pageSize)}
          onChangePage={onChangePage}
          zeroBasedPageNumber={zeroBasedPageNumber}
        />
      )}
    </div>
  );
}

export const Table = React.forwardRef(TableComponent) as typeof TableComponent;
