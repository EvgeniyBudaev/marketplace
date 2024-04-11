import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
// import {useChangeLanguage} from 'remix-i18next';

export function useChangeLanguage(locale: string) {
  let { i18n } = useTranslation();

  useEffect(() => {
    i18n.changeLanguage(locale.toLowerCase());
  }, [locale, i18n]);
}

export const useInitLanguage = (locale: string) => {
  const [language, setLanguage] = useState(locale.toLowerCase());
  useChangeLanguage(language);

  return [language, setLanguage];
};
