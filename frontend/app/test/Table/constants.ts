import type { TTableThemes } from "./types";

export const THEME: TTableThemes = {
  admin: {
    root: "relative overflow-x-auto border-t border-r border-b",
    table: "",
    headerRow: "relative bg-grey text-dark border-b-1 border-b text-base font-medium",
    bodyRow:
      "even:bg-grey text-dark odd:bg-light border-b-1 w-full border-b text-base font-semibold",
    bodyCell: "p-4 border-l",
    headerCell: "font-medium text-left p-4 border-l",
  },

  default: {
    root: "relative overflow-x-auto rounded-t-lg",
    table: "",
    headerRow: "relative bg-grey text-grey-dark border-grey border-b text-base font-medium",
    bodyRow:
      "even:bg-grey text-dark odd:bg-light border-grey w-full border-b text-base font-semibold",
    bodyCell: "p-4",
    headerCell: "font-medium text-left p-4 overflow-hidden",
  },

  new: {
    root: "relative overflow-x-auto rounded-t-lg",
    table: "",
    headerRow: "relative bg-grey text-grey-dark border-grey border-b text-base font-medium",
    bodyRow:
      "even:bg-[#EBF9F5] odd:bg-[#EBF9F5] text-dark border-grey w-full border-b py-4 text-base font-semibold",
    bodyCell: "p-4 overflow-hidden",
    headerCell: "font-medium text-left p-4 overflow-hidden",
  },
};

export const DEFAULT_MESSAGES = {
  pageSize: "Количество результатов \n на странице",
};

export enum ETableSortDirection {
  Asc = "ASC",
  Desc = "DESC",
}
