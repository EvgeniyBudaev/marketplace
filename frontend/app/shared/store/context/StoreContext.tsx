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
    id: "1",
    user: null,
    products: [],
    createdAt: "",
    modifyDate: "",
  },
  setCart: (): void => {},
};

export const StoreContext = createContext<TStore>(defaultStore);
