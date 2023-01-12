import { useCallback } from "react";
import { useFetcher } from "@remix-run/react";
import { TCartItemIncrementParams } from "~/shared/api/cart";
import type { TActionCartItemChange, TActionCartItemDelete } from "~/shared/api/cart";
import { useStoreContext } from "~/shared/store";
import { EFormMethods } from "~/shared/form";
import { ERoutes } from "~/enums";

export const useCart = () => {
  const { cart, setCart } = useStoreContext();
  const fetcher = useFetcher();

  const onChangeCart = useCallback(
    async (value: any) => {
      await setCart(value);
    },
    [setCart],
  );

  const handleCartItemIncrement = useCallback(async (params: TCartItemIncrementParams) => {
    // fetcher.submit(
    //   { params: JSON.stringify(params) },
    //   {
    //     method: EFormMethods.Post,
    //     action: ERoutes.ResourcesCartItemIncrement,
    //   },
    // );
  }, []);

  const handleChangeCartItem = useCallback(
    async (action: TActionCartItemChange) => {
      // if (cart && cart.products && cart.products.length !== 0) {
      //   const existItem = cart.products.find(
      //     (item) => item.product.id === action.payload.product.id,
      //   );
      //   const cartItems = existItem
      //     ? cart.products.map((item) =>
      //         item.product.id === existItem.product.id ? action.payload : item,
      //       )
      //     : [...cart.products, action.payload];
      //   await setCart((prevState) => ({
      //     ...prevState,
      //     products: cartItems,
      //   }));
      // } else {
      //   const newCart = { products: [action.payload] };
      //   fetcher.submit(
      //     { cart: JSON.stringify(newCart) },
      //     {
      //       method: EFormMethods.Post,
      //       action: ERoutes.ResourcesCart,
      //     },
      //   );
      //   await setCart((prevState) => ({
      //     ...prevState,
      //     products: [action.payload],
      //   }));
      // }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const handleDeleteCartItem = useCallback(
    async (action: TActionCartItemDelete) => {
      // const filteredProducts = cart.products.filter(
      //   (item) => item.product.id !== action.payload.id,
      // );
      // await setCart((prevState) => ({
      //   ...prevState,
      //   products: filteredProducts,
      // }));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  return {
    cart,
    onChangeCart,
    onChangeCartItem: handleChangeCartItem,
    onDeleteCartItem: handleDeleteCartItem,
    onCartItemIncrement: handleCartItemIncrement,
  };
};
