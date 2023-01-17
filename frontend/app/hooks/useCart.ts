import { useCallback } from "react";
import { useFetcher } from "@remix-run/react";
import { useStoreContext } from "~/shared/store";

export const useCart = () => {
  const fetcher = useFetcher();
  const { cart } = useStoreContext();

  return { cart };
};
