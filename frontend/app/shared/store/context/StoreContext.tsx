import { createContext } from "react";
import { TCart } from "~/shared/api/cart";
import { DEFAULT_CART } from "~/shared/store";
import type { TStore } from "~/shared/store";

const defaultStore: TStore = {
  cart: DEFAULT_CART,
  setCart: (): void => {},
  settings: {
    currency: "",
    language: "",
    theme: "",
    uuid: "",
  },
  setSettings: (): void => {},
  user: {
    id: 0,
    firstName: "",
    middleName: "",
    lastName: "",
    phone: "",
    email: "",
    shippingAddress: null,
    isEmailVerified: false,
    isPhoneVerified: false,
    createdAt: "",
    modifyDate: "",
  },
  setUser: (): void => {},
};

export const StoreContext = createContext<TStore>(defaultStore);
