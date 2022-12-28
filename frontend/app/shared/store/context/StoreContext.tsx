import { createContext } from "react";
import type { TStore } from "~/shared/store";

const defaultStore: TStore = {
  user: {},
  setUser: (): void => {},
};

export const StoreContext = createContext<TStore>(defaultStore);
