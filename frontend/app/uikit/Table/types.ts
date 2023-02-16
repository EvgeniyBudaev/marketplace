import { ChangeEvent, FormEvent, KeyboardEvent, MouseEvent } from "react";
import { ColumnDef, OnChangeFn, RowSelectionState } from "@tanstack/react-table";
import { ETableSortDirection } from "~/uikit";
// import {TableSortingType} from "~/uikit/Table/Table";

export type TTableProps<TColumn extends Record<string, any>> = {
  className?: string;
  columns: Array<ColumnDef<TColumn>>;
  currentPage?: number;
  data: TColumn[];
  defaultPageSize?: number | null;
  getId?: (row: TColumn) => string | number;
  pagesCount?: number;
  rowSelection?: RowSelectionState;
  // sorting?: TableSortingType;
  sorting?: any;
  onChangePageSize?: (pageSize: number) => void;
  onPageChange?: ({ selected }: { selected: number }) => void;
  onRowSelectionChange?: OnChangeFn<RowSelectionState>;
  // onSort?: (sorting: TableSortingType) => void;
  onSort?: any;
  pageSizeOptions?: number[] | null;
  totalItems?: number;
  totalItemsTitle?: string;
};

export type TTableSortingColumnState = {
  sortProperty: string;
  sortDirection?: ETableSortDirection;
};

export type TTableSortingProps = {
  onChangeSorting: (
    sortingParams?: TTableSortingColumnState | Array<TTableSortingColumnState>,
  ) => void;
  columns: string[];
  defaultSorting?: TTableSortingColumnState | Array<TTableSortingColumnState>;
  multiple?: boolean;
};
