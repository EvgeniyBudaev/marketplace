import type { ReactNode } from "react";
import { StoreContext } from "~/shared/store";
import type { TStore } from "~/shared/store";

export type TStoreContextProviderProps = {
  store: TStore;
  children: ReactNode;
};

export const StoreContextProvider = ({ store, children }: TStoreContextProviderProps) => {
  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>;
};
