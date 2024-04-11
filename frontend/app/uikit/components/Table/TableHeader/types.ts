import type { TTableSortingColumnState } from "#app/uikit/components/Table/types";

export type TSortingColumnStateWithReset = TTableSortingColumnState & {
  shouldReset?: boolean;
};
