import type { Row } from "@tanstack/react-table";
import type { TTableClasses, TTheme } from "../types";

export type TTableBodyProps<TColumn extends object> = {
  rows: Row<TColumn>[];
  theme: TTheme;
  classes?: TTableClasses;
};

export type TTableRowOriginal = {
  isNew?: boolean;
};
