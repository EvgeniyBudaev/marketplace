import type { Context, Dispatch, SetStateAction } from "react";

export type TStore = {
  settings: any;
  setSettings: Dispatch<SetStateAction<Context<any>>>;
  user: any;
  setUser: Dispatch<SetStateAction<Context<any>>>;
};
