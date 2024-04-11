import type { Context, Dispatch, SetStateAction } from "react";
import type { TCart } from "#app/shared/api/cart";
import type { TSettings } from "#app/shared/api/settings";

export type TStore = {
  cart: TCart;
  setCart: Dispatch<SetStateAction<Context<TCart>>>;
  settings: TSettings;
  setSettings: Dispatch<SetStateAction<Context<TSettings>>>;
  user: any;
  setUser: Dispatch<SetStateAction<Context<any>>>;
};
