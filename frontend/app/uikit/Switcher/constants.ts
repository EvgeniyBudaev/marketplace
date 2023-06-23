import clsx from "clsx";
import {ESwitcherVariant} from "~/uikit";
import styles from "./Switcher.css";

export const SWITCHER_THEMES = () => {
  return {
    [ESwitcherVariant.Default]: clsx("Switcher"),
    [ESwitcherVariant.Header]: clsx("Switcher Switcher__header"),
  };
};

export function switcherLinks() {
  return [{rel: "stylesheet", href: styles}];
}
