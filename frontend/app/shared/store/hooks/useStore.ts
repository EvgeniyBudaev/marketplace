import {useState} from "react";
import type {TCart} from "~/shared/api/cart";
import {TSettings} from "~/shared/api/settings";
import {DEFAULT_CART} from "~/shared/store";

export const useStore = () => {
  const [cart, setCart] = useState<any>(DEFAULT_CART);
  const [settings, setSettings] = useState<any>({
    currency: "",
    language: "",
    theme: "",
    uuid: "",
  });
  const [user, setUser] = useState<any>();

  return {cart, setCart, settings, setSettings, user, setUser};
};
