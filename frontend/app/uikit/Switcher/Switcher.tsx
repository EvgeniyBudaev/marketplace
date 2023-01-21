import { memo } from "react";
import type { FC, ReactNode } from "react";
import clsx from "clsx";
import styles from "./Switcher.module.css";

type TProps = {
  children?: ReactNode;
  isChecked?: boolean;
};

const SwitcherComponent: FC<TProps> = ({ children, isChecked }) => {
  return (
    <div className="Switcher">
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

export function switcherLinks() {
  return [{ rel: "stylesheet", href: styles }];
}
