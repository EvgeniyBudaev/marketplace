import { useState } from "react";

export const useStore = () => {
  const [user, setUser] = useState({});

  return { user, setUser };
};
