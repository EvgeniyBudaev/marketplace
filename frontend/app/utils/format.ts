import dayjs from "dayjs";
import utc from "dayjs/plugin/utc.js";

dayjs.extend(utc);

export const formatCurrency = (value: number | string): string => {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
};
