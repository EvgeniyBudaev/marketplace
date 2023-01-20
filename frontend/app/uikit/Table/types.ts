import React from "react";
import { ColumnDef, OnChangeFn, RowSelectionState } from "@tanstack/react-table";
// import {TableSortingType} from "~/uikit/Table/Table";

export type TTableProps<TColumn extends Record<string, any>> = {
  className?: string;
  columns: Array<ColumnDef<TColumn>>;
  currentPage?: number;
  data: TColumn[];
  getId?: (row: TColumn) => string | number;
  pagesCount?: number;
  rowSelection?: RowSelectionState;
  searchedKeyword?: string;
  // sorting?: TableSortingType;
  sorting?: any;
  isSearch?: boolean;
  onPageChange?: ({ selected }: { selected: number }) => void;
  onRowSelectionChange?: OnChangeFn<RowSelectionState>;
  onSearchChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  // onSort?: (sorting: TableSortingType) => void;
  onSort?: any;
  totalItems?: number;
  totalItemsTitle?: string;
};
