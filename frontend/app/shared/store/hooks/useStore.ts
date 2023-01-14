import { useState } from "react";

export const useStore = () => {
  const [user, setUser] = useState<any>();

  return { user, setUser };
};
