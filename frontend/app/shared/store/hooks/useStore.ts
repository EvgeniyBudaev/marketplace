import { useState } from "react";
import { TSettings } from "~/shared/api/settings";

export const useStore = () => {
  const [settings, setSettings] = useState<any>({
    currency: "",
    language: "",
    theme: "",
    uuid: "",
  });
  const [user, setUser] = useState<any>();

  return { settings, setSettings, user, setUser };
};
