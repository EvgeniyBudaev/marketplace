import type { TProduct } from "#app/shared/api/products";

export type TDeleteModalState = {
  isOpen: boolean;
  alias?: string;
};

export type TTableColumn = TProduct;
