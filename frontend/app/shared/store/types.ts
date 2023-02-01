import type { Context, Dispatch, SetStateAction } from "react";
import { TSettings } from "~/shared/api/settings";

export type TStore = {
  settings: TSettings;
  setSettings: Dispatch<SetStateAction<Context<TSettings>>>;
  user: any;
  setUser: Dispatch<SetStateAction<Context<any>>>;
};
