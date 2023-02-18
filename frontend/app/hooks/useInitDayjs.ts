import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";

export const useInitDayjs = () => {
  const { i18n } = useTranslation();
  const isInitialized = useRef(false);

  if (!isInitialized.current) {
    isInitialized.current = true;
    dayjs.locale(i18n.language);
  }

  useEffect(() => {
    dayjs.locale(i18n.language);
  }, [i18n.language]);
};
