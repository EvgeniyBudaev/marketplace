import { useState } from "react";
import type { TCart } from "~/shared/api/cart";

export const useStore = () => {
  const initialCart = {
    id: "1",
    user: null,
    products: [],
    createdAt: "",
    modifyDate: "",
  };

  const [cart, setCart] = useState<any>(initialCart);
  const [user, setUser] = useState<any>();

  return { cart, user, setCart, setUser };
};
