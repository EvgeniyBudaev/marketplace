import type { TUser } from "~/shared/api/users/types";
import type { Context, Dispatch, SetStateAction } from "react";

export type TStore = {
  user: any;
  setUser: Dispatch<SetStateAction<Context<any>>>;
};
