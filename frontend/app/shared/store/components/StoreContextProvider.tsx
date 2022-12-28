import type { ReactNode } from "react";
import { StoreContext, useStore } from "~/shared/store";

export type TStoreContextProviderProps = {
  children: ReactNode;
};

export const StoreContextProvider = ({ children }: TStoreContextProviderProps) => {
  return <StoreContext.Provider value={useStore()}>{children}</StoreContext.Provider>;
};
