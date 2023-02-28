import { useState } from "react";
import type { FC } from "react";
import clsx from "clsx";
import { ETheme } from "~/enums";
import { ESwitcherVariant, IconButton, Switcher, SWITCHER_THEMES } from "~/uikit";

type TProps = {
  className?: string;
  variant?: ESwitcherVariant;
};

export const ThemeSwitcher: FC<TProps> = ({ className, variant = ESwitcherVariant.Default }) => {
  const currentTheme = SWITCHER_THEMES()[variant];
  const [theme, setTheme] = useState("LIGHT");
  const isLight = theme !== ETheme.Dark;

  const handleClick = (theme: ETheme) => () => {
    setTheme(theme);
  };

  const handleSwitchToDark = handleClick(ETheme.Dark);
  const handleSwitchToLight = handleClick(ETheme.Light);

  return (
    <Switcher className={clsx(currentTheme, className)} isChecked={isLight} variant={variant}>
      <IconButton
        className={clsx("ThemeSwitcher-DisplayButton", {
          "ThemeSwitcher-DisplayButton__checked": isLight,
        })}
        typeIcon="LightMode"
        onClick={handleSwitchToLight}
      />
      <IconButton
        className={clsx("ThemeSwitcher-DisplayButton", {
          "ThemeSwitcher-DisplayButton__checked": !isLight,
        })}
        typeIcon="DarkMode"
        onClick={handleSwitchToDark}
      />
    </Switcher>
  );
};
