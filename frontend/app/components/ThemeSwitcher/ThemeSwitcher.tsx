import type { FC } from "react";
import clsx from "clsx";
import { useTheme } from "~/hooks";
import { ESwitcherVariant, ETheme, IconButton, Switcher, SWITCHER_THEMES } from "~/uikit";

type TProps = {
  className?: string;
  variant?: ESwitcherVariant;
};

export const ThemeSwitcher: FC<TProps> = ({ className, variant = ESwitcherVariant.Default }) => {
  const currentTheme = SWITCHER_THEMES()[variant];
  const { theme, onChangeTheme } = useTheme();
  const isLight = theme !== ETheme.Dark;

  const handleClick = (theme: ETheme) => () => {
    onChangeTheme(theme);
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
