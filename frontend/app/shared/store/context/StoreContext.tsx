import { createContext } from "react";
import type { TStore } from "~/shared/store";

const defaultStore: TStore = {
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
  cart: {
    uuid: "",
    createdAt: "",
    modifyDate: "",
    items: null,
    cartAmount: 0,
  },
  setCart: (): void => {},
};

export const StoreContext = createContext<TStore>(defaultStore);
