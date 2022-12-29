import { useState } from "react";
import type { TUser } from "~/shared/api/users/types";

export const useStore = () => {
  const [user, setUser] = useState<any>();

  return { user, setUser };
};
