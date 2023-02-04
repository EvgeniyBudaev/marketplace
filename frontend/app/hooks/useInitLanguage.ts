import { useChangeLanguage } from "remix-i18next";
import { useState } from "react";

export const useInitLanguage = () => {
  const [language, setLanguage] = useState("ru");
  useChangeLanguage("ru");

  return [language, setLanguage];
};
