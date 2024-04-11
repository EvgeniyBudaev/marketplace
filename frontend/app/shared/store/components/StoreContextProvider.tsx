import type { ReactNode } from "react";
import { StoreContext } from "#app/shared/store";
import type { TStore } from "#app/shared/store";

export type TStoreContextProviderProps = {
  store: TStore;
  children: ReactNode;
};

export const StoreContextProvider = ({
  store,
  children,
}: TStoreContextProviderProps) => {
  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};
