import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

export const formatCurrency = (value: number | string): string => {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
};

export const formatProxy = (value: string): string => {
  return `/proxy/${value}`;
};

export const formatListProxy = (value: string[]): string[] => {
  return value.map((image) => `/proxy/${image}`);
};
