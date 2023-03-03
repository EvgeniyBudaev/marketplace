import type { Column } from "@tanstack/react-table";

export type TOptionsProps<T extends object> = {
  columns: Column<T, unknown>[];
  hiddenColumns?: string[];
  optionsChangeText?: string;
  optionsFieldHeader?: string;
  optionsModalHeader?: string;
  optionsSorting?: {
    ascText?: string;
    descText?: string;
    hideColumnText?: string;
  };
  setHiddenColumns: (hiddenColumns: string[]) => void;
};
