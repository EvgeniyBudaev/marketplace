import { useState } from "react";

export const useStore = () => {
  const [cart, setCart] = useState<any>();
  const [user, setUser] = useState<any>();

  return { cart, user, setCart, setUser };
};
