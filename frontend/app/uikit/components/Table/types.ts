import type { ReactNode } from "react";
import type { Column, ColumnDef, OnChangeFn, RowSelectionState } from "@tanstack/react-table";
import type { ETableSortDirection, ETheme } from "~/uikit";

type TOptionsProps<T extends object> = {
  columns: Column<T, unknown>[];
  hiddenColumns?: string[];
  optionsSorting?: {
    ascText?: string;
    descText?: string;
    hideColumnText?: string;
  };
  setHiddenColumns: (hiddenColumns: string[]) => void;
};

type TSettingsProps<T extends object> = {
  options?: Omit<TOptionsProps<T>, "columns">;
  columns: TOptionsProps<T>["columns"];
};

type TTableSettingsProps<TColumn extends object> = Omit<TSettingsProps<TColumn>, "columns">;

type TTableMessages = {
  notFound?: string;
};

export type TTableProps<TColumn extends Record<string, any>> = {
  className?: string;
  columns: Array<ColumnDef<TColumn>>;
  currentPage?: number;
  data: TColumn[];
  dataTestId?: string;
  debug?: boolean;
  defaultPageSize?: number | null;
  getId?: (row: TColumn) => string | number;
  isLoading?: boolean;
  messages?: TTableMessages;
  onChangePageSize?: (pageSize: number) => void;
  onPageChange?: ({ selected }: { selected: number }) => void;
  onRowSelectionChange?: OnChangeFn<RowSelectionState>;
  pagesCount?: number;
  pageSizeOptions?: number[] | null;
  rowActions?: TTableRowActions<TColumn>;
  rowSelection?: RowSelectionState;
  settings?: TTableSettingsProps<TColumn>;
  sorting?: TTableSortingProps;
  sticky?: boolean;
  theme?: ETheme;
  totalItems?: number;
  totalItemsTitle?: string;
};

export type TTableSortingColumnState = {
  sortProperty: string;
  sortDirection?: ETableSortDirection;
};

export type TTableSortingParams = TTableSortingColumnState | Array<TTableSortingColumnState>;

export type TTableSortingProps = {
  onChangeSorting: (
    sortingParams?: TTableSortingColumnState | Array<TTableSortingColumnState>,
  ) => void;
  columns: string[];
  defaultSorting?: TTableSortingColumnState | Array<TTableSortingColumnState>;
  multiple?: boolean;
};

export type TTableSortingHandleChange = {
  sortProperty: string;
  sortDirection: ETableSortDirection;
  shouldReset?: boolean;
  close?: () => void;
};

export type TTableRowAction<TColumn> = {
  icon?: ReactNode;
  title: string;
  onClick(row: TColumn): void;
};

export type TTableRowActions<TColumn> = Array<TTableRowAction<TColumn>>;
