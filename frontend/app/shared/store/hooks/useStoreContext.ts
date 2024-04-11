import { useContext } from "react";
import { StoreContext } from "#app/shared/store";

export const useStoreContext = () => useContext(StoreContext);
