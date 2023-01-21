import { useState } from "react";
import type { FC } from "react";
import clsx from "clsx";
import { ETheme } from "~/enums";
import { IconButton, Switcher } from "~/uikit";
import styles from "./ThemeSwitcher.module.css";

export const ThemeSwitcher: FC = () => {
  const [theme, setTheme] = useState("LIGHT");
  const isLight = theme !== ETheme.Dark;

  const handleClick = (theme: ETheme) => () => {
    setTheme(theme);
  };

  const handleSwitchToDark = handleClick(ETheme.Dark);
  const handleSwitchToLight = handleClick(ETheme.Light);

  return (
    <Switcher isChecked={isLight}>
      <IconButton
        className={clsx("ThemeSwitcher-Switcher-DisplayButton", {
          "ThemeSwitcher-Switcher-DisplayButton__checked": isLight,
        })}
        typeIcon="LightMode"
        onClick={handleSwitchToLight}
      />
      <IconButton
        className={clsx("ThemeSwitcher-Switcher-DisplayButton", {
          "ThemeSwitcher-Switcher-DisplayButton__checked": !isLight,
        })}
        typeIcon="DarkMode"
        onClick={handleSwitchToDark}
      />
    </Switcher>
  );
};

export function themeSwitcherLinks() {
  return [{ rel: "stylesheet", href: styles }];
}
