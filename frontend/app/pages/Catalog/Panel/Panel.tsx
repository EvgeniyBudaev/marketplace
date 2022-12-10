import { FC } from "react";
import clsx from "clsx";
import { IconButton } from "~/uikit";
import styles from "./Panel.module.css";

type TProps = {
  isClickedDisplayLine?: boolean;
  onDisplayLine: () => void;
};

export const Panel: FC<TProps> = ({ isClickedDisplayLine, onDisplayLine }) => {
  return (
    <div className="Panel">
      <div className="Panel-Inner">
        <div className="Panel-SelectGroup">Select</div>
        <div className="Panel-ListingViewSwitcher">
          <div className="Panel-ListingViewSwitcherInner">
            <div
              className={clsx("Panel-ListingViewSwitcherPointer", {
                "Panel-ListingViewSwitcherPointer__line": isClickedDisplayLine,
              })}
            />
            <div className="Panel-DisplayButtons">
              <IconButton
                className={clsx("Panel-DisplayButton", {
                  "Panel-DisplayButton__line": isClickedDisplayLine,
                })}
                typeIcon="DisplayLine"
                onClick={onDisplayLine}
              />
              <IconButton
                className={clsx("Panel-DisplayButton", {
                  "Panel-DisplayButton__line": !isClickedDisplayLine,
                })}
                typeIcon="DisplayGrid"
                onClick={onDisplayLine}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export function panelLinks() {
  return [{ rel: "stylesheet", href: styles }];
}
