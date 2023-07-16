import { memo } from "react";
import type { FC, ReactNode } from "react";
import clsx from "clsx";
import { ESwitcherVariant, SWITCHER_THEMES } from "~/uikit";

type TProps = {
  children?: ReactNode;
  className?: string;
  dataTestId?: string;
  isChecked?: boolean;
  variant?: ESwitcherVariant;
};

const SwitcherComponent: FC<TProps> = ({
  children,
  className,
  dataTestId = "uikit__switcher",
  isChecked,
  variant = ESwitcherVariant.Default,
}) => {
  const currentTheme = SWITCHER_THEMES()[variant];

  return (
    <div className={clsx(currentTheme, className)} data-testid={dataTestId}>
      <div className="Switcher-Inner">
        <div
          className={clsx("Switcher-Pointer", {
            "Switcher-Pointer__checked": isChecked,
          })}
        />
        <div className="Switcher-DisplayButtons">{children}</div>
      </div>
    </div>
  );
};

export const Switcher = memo(SwitcherComponent);
