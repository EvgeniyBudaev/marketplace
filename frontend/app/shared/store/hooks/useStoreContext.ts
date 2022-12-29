import { useContext } from "react";
import { StoreContext } from "~/shared/store";

export const useStoreContext = () => useContext(StoreContext);
