import type { TProductByCatalog } from "~/shared/api/products";

export type TFocusDirection = "up" | "down";

export type TFocusedOption = {
  focusedOption: TProductByCatalog | null;
};
