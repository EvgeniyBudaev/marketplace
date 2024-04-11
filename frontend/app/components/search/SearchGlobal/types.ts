import type { TProductByCatalog } from "#app/shared/api/products";

export type TFocusDirection = "up" | "down";

export type TFocusedOption = {
  focusedOption: TProductByCatalog | null;
};
