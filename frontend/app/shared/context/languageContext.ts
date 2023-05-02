import { createContext } from "react";
import type { Dispatch, SetStateAction } from "react";

export const ChangeLanguageContext = createContext<[boolean, Dispatch<SetStateAction<boolean>>]>([
  false,
  () => {},
]);
export const ChangeLanguageProvider = ChangeLanguageContext.Provider;
