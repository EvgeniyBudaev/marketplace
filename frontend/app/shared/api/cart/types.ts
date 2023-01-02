import type { TProduct } from "~/shared/api/products";
import type { TUser } from "~/shared/api/users/types";

export type TCartItem = {
  id: number;
  product: TProduct;
  quantity: number;
  //createdAt: string;
  //modifyDate: string;
};

export type TCart = {
  id: string;
  user: TUser | null;
  products: TCartItem[];
  createdAt: string;
  modifyDate: string;
};

export type TActionCartItemChange = {
  payload: TCartItem;
};

export type TActionCartItemDelete = {
  payload: {
    id: number;
  };
};
