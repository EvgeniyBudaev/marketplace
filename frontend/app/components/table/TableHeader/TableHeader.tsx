import type { FC, ReactElement, ReactNode } from "react";
import clsx from "clsx";
import { Tooltip } from "~/uikit";
import type { TPlacement } from "~/uikit/Tooltip";
import styles from "./TableHeader.module.css";

type TProps = {
  children?: ReactNode;
  info?: string | ReactElement;
  placement?: TPlacement;
};

export const TableHeader: FC<TProps> = ({ children, info, placement = "top" }) => {
  return (
    <div className={clsx("TableHeader", { "TableHeader-CursorHelp": info })}>
      {info ? (
        <Tooltip message={info} placement={placement}>
          {children}
        </Tooltip>
      ) : (
        children
      )}
    </div>
  );
};

export function tableHeaderLinks() {
  return [{ rel: "stylesheet", href: styles }];
}
