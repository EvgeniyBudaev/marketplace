import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export function useChangeLanguage(locale: string) {
  let { i18n } = useTranslation();

  useEffect(() => {
    i18n.changeLanguage(locale);
  }, [locale, i18n]);
}

export const useInitLanguage = (locale: string) => {
  const [language, setLanguage] = useState(locale);
  useChangeLanguage(language);

  return [language, setLanguage];
};
