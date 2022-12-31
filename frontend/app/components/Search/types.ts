import type { TProduct } from "~/shared/api/products";

export type TFocusDirection = "up" | "down";

export type TFocusedOption = {
  focusedOption: TProduct | null;
};
