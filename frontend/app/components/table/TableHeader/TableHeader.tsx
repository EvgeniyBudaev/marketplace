import type {FC, ReactElement, ReactNode} from "react";
import clsx from "clsx";
import {Tooltip} from "~/uikit";
import {ETablePlacement} from "~/uikit/components/Table/enums";
import type {TPlacement} from "app/uikit/components/Tooltip";
import styles from "./TableHeader.css";

type TProps = {
  children?: ReactNode;
  info?: string | ReactElement;
  placement?: TPlacement;
};

export const TableHeader: FC<TProps> = ({children, info, placement = ETablePlacement.Top}) => {
  return (
    <div className={clsx("TableHeader", {"TableHeader-CursorHelp": info})}>
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
  return [{rel: "stylesheet", href: styles}];
}
