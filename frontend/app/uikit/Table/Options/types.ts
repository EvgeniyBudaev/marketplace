import type { Column } from "@tanstack/react-table";

export type TOptionsSorting = {
  ascText?: string;
  defaultText?: string;
  descText?: string;
  hideColumnText?: string;
};

export type TOptionsProps<T extends object> = {
  columns: Column<T, unknown>[];
  hiddenColumns?: string[];
  optionsChangeText?: string;
  optionsFieldHeader?: string;
  optionsModalHeader?: string;
  optionsSorting?: TOptionsSorting;
  setHiddenColumns: (hiddenColumns: string[]) => void;
};
