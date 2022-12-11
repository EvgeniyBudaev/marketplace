import { FC } from "react";
import clsx from "clsx";
import { IconButton } from "~/uikit";
import styles from "./CardsSwitcher.module.css";

type TProps = {
  isCardsLine: boolean;
  onCardsSwitcher: () => void;
};

export const CardsSwitcher: FC<TProps> = ({ isCardsLine, onCardsSwitcher }) => {
  return (
    <div className="CardsSwitcher">
      <div className="CardsSwitcher-Inner">
        <div
          className={clsx("CardsSwitcher-Pointer", {
            "CardsSwitcher-Pointer__line": isCardsLine,
          })}
        />
        <div className="CardsSwitcher-DisplayButtons">
          <IconButton
            className={clsx("CardsSwitcher-DisplayButton", {
              "CardsSwitcher-DisplayButton__line": isCardsLine,
            })}
            typeIcon="DisplayLine"
            onClick={onCardsSwitcher}
          />
          <IconButton
            className={clsx("CardsSwitcher-DisplayButton", {
              "CardsSwitcher-DisplayButton__line": !isCardsLine,
            })}
            typeIcon="DisplayGrid"
            onClick={onCardsSwitcher}
          />
        </div>
      </div>
    </div>
  );
};

export function cardsSwitcherLinks() {
  return [{ rel: "stylesheet", href: styles }];
}
