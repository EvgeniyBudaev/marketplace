import type { TProduct } from "~/shared/api/products";

export type TDeleteModalState = {
  isOpen: boolean;
  alias?: string;
};

export type TTableColumn = TProduct;
