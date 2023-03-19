import type { FC } from "react";
import clsx from "clsx";
import { HEADER_LINE_THEMES } from "~/components/Layout/Header/HeaderLine/constants";
import { useTheme } from "~/hooks";
import styles from "./HeaderLine.module.css";

type TProps = {
  className?: string;
};

export const HeaderLine: FC<TProps> = ({ className }) => {
  const { theme } = useTheme();
  const currentTheme = HEADER_LINE_THEMES()[theme];

  return <div className={clsx(currentTheme, className)} />;
};

export function headerLineLinks() {
  return [{ rel: "stylesheet", href: styles }];
}
