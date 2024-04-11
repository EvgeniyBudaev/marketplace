import { useContext, useEffect } from "react";
import type { FC } from "react";
import clsx from "clsx";
import { SOCKET_RECEIVE_THEME, SOCKET_SEND_THEME } from "#app/constants";
import { useTheme } from "#app/hooks";
import { SocketContext } from "#app/shared/context";
import {
  ESwitcherVariant,
  ETheme,
  IconButton,
  Switcher,
  SWITCHER_THEMES,
} from "#app/uikit";

type TProps = {
  className?: string;
  variant?: ESwitcherVariant;
};

export const ThemeSwitcher: FC<TProps> = ({
  className,
  variant = ESwitcherVariant.Default,
}) => {
  const socket = useContext(SocketContext);
  const currentTheme = SWITCHER_THEMES()[variant];
  const { theme, onChangeTheme } = useTheme();
  const isLight = theme !== ETheme.Dark;

  useEffect(() => {
    if (!socket) return;
    socket.on(SOCKET_RECEIVE_THEME, (data) => {
      onChangeTheme?.(data);
    });
  }, [onChangeTheme, socket]);

  const handleClick = (theme: ETheme) => () => {
    onChangeTheme(theme);
    socket && socket.emit(SOCKET_SEND_THEME, theme);
  };

  const handleSwitchToDark = handleClick(ETheme.Dark);
  const handleSwitchToLight = handleClick(ETheme.Light);

  return (
    <Switcher
      className={clsx(currentTheme, className)}
      isChecked={isLight}
      variant={variant}
    >
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
