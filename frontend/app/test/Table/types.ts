import type { ColumnDef, OnChangeFn, RowSelectionState } from '@tanstack/react-table';
import type { TFooterProps } from './Footer';

export type TTheme = {
  root: string;
  table: string;
  headerRow: string;
  headerCell: string;
  bodyRow: string;
  bodyCell: string;
};

export type TTableClasses = Partial<TTheme>;

export type TTableThemeVariant = 'default' | 'admin' | 'new';

export type TTableThemes = Record<TTableThemeVariant, TTheme>;

export type TTableMessages = {
  pageSize?: string;
};

export type TTableSortDirection = 'ASC' | 'DESC';

export type TTablePaginationProps = {
  hasNext: boolean;
  hasPrev: boolean;
  page: number;
  pageSize?: number;
  onChangePageSize: (pageSize: number) => void;
  onChangePage: (page: number) => void;
  zeroBasedPageNumber?: boolean;
  count?: number;
};

export type TTableSortingColumnState = {
  sortProperty: string;
  sortDirection?: TTableSortDirection;
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

export type TTableFooterProps<TColumn extends object> = Omit<TFooterProps<TColumn>, 'columns'>;

export type TTableProps<TColumn extends Record<string, any>> = {
  data: Array<TColumn>;
  dataTestId?: string;
  getId?: (row: TColumn) => string;
  theme?: TTableThemeVariant;
  isLoading?: boolean;
  columns: Array<ColumnDef<TColumn>>;
  messages?: TTableMessages;
  pagination?: TTablePaginationProps;
  rowSelection?: RowSelectionState;
  sorting?: TTableSortingProps;
  footer?: TTableFooterProps<TColumn>;
  classes?: TTableClasses;
  onRowSelectionChange?: OnChangeFn<RowSelectionState>;
  debug?: boolean;
};
