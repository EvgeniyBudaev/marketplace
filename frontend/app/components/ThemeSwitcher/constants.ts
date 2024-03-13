import clsx from "clsx";
import { ESwitcherVariant } from "~/uikit";
import styles from "./ThemeSwitcher.css";

export const SWITCHER_THEMES = () => {
  return {
    [ESwitcherVariant.Default]: clsx("ThemeSwitcher"),
    [ESwitcherVariant.Header]: clsx("ThemeSwitcher ThemeSwitcher__header"),
  };
};

export function themeSwitcherLinks() {
  return [{ rel: "stylesheet", href: styles }];
}
