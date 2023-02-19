import type { ColumnDef, OnChangeFn, RowSelectionState } from "@tanstack/react-table";
import type { ETableSortDirection } from "~/uikit";

export type TTableProps<TColumn extends Record<string, any>> = {
  className?: string;
  columns: Array<ColumnDef<TColumn>>;
  currentPage?: number;
  data: TColumn[];
  defaultPageSize?: number | null;
  getId?: (row: TColumn) => string | number;
  pagesCount?: number;
  rowSelection?: RowSelectionState;
  sorting?: TTableSortingProps;
  onChangePageSize?: (pageSize: number) => void;
  onPageChange?: ({ selected }: { selected: number }) => void;
  onRowSelectionChange?: OnChangeFn<RowSelectionState>;
  pageSizeOptions?: number[] | null;
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
