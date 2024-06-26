import { useCallback } from "react";
import { useStoreContext } from "#app/shared/store";

export const useCart = () => {
  const { cart, setCart } = useStoreContext();

  const onChangeCart = useCallback(
    async (value: any) => {
      await setCart(value);
    },
    [setCart]
  );

  return { cart, onChangeCart };
};
