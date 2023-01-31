import { useState } from "react";

export const useStore = () => {
  const [settings, setSettings] = useState<any>();
  const [user, setUser] = useState<any>();

  return { settings, setSettings, user, setUser };
};
