import { useCallback, useEffect, useState } from "react";
import { useFetcher } from "@remix-run/react";
import { ERoutes } from "~/enums";
import type { TCart } from "~/shared/api/cart";

export const useCart = () => {
  const [cart, setCart] = useState<TCart | null>(null);
  const fetcher = useFetcher();

  useEffect(() => {
    setCart(fetcher.data?.cart);
  }, [fetcher.data]);

  useEffect(() => {
    onLoadCatalogs();
  }, []);

  const onLoadCatalogs = useCallback(() => {
    fetcher.load(ERoutes.Cart);
  }, [fetcher]);

  return { cart };
};
