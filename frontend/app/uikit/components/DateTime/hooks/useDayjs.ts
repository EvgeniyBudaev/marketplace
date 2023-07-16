import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";
import "dayjs/locale/ru";

export type TDayjs = typeof dayjs;

export function useDayjs(): { dayjs: TDayjs } {
  const { i18n } = useTranslation();
  const [dateState, setDateState] = useState({ dayjs });

  useEffect(() => {
    setDateState({ dayjs });
  }, [i18n.language]);

  return dateState;
}
