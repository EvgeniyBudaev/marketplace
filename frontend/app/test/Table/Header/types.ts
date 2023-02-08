import type { HeaderGroup } from "@tanstack/react-table";
import type { TTableClasses, TTableSortingProps, TTheme } from "../types";
import type { TTableSortingColumnState } from "../types";

export type THeaderTableProps<TColumn extends object> = {
  classes?: TTableClasses;
  headerGroups: HeaderGroup<TColumn>[];
  theme: TTheme;
  sorting?: TTableSortingProps;
};

export type TSortingColumnStateWithReset = TTableSortingColumnState & { shouldReset?: boolean };
