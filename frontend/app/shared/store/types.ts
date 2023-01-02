import type { Context, Dispatch, SetStateAction } from "react";
import type { TCart } from "~/shared/api/cart";

export type TStore = {
  user: any;
  setUser: Dispatch<SetStateAction<Context<any>>>;
  cart: TCart;
  setCart: Dispatch<SetStateAction<Context<TCart>>>;
};
