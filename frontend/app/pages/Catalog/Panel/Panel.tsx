import type { FC } from "react";
import clsx from "clsx";
import { Sorting } from "#app/pages/Catalog/Sorting";
import type { TSorting } from "#app/types";
import { IconButton, Switcher } from "#app/uikit";
import styles from "./Panel.css";

type TProps = {
  isCardsLine: boolean;
  onCardsSwitcher: () => void;
  onSortingChange: (data: TSorting["value"]) => void;
  sorting: TSorting["value"];
};

export const Panel: FC<TProps> = ({
  isCardsLine,
  onCardsSwitcher,
  onSortingChange,
  sorting,
}) => {
  return (
    <div className="Panel">
      <div className="Panel-Inner">
        <Sorting onSortingChange={onSortingChange} sorting={sorting} />
        <Switcher isChecked={isCardsLine}>
          <IconButton
            className={clsx("Panel-Switcher-DisplayButton", {
              "Panel-Switcher-DisplayButton__checked": isCardsLine,
            })}
            typeIcon="DisplayLine"
            onClick={onCardsSwitcher}
          />
          <IconButton
            className={clsx("Panel-Switcher-DisplayButton", {
              "Panel-Switcher-DisplayButton__checked": !isCardsLine,
            })}
            typeIcon="DisplayGrid"
            onClick={onCardsSwitcher}
          />
        </Switcher>
      </div>
    </div>
  );
};

export function panelLinks() {
  return [{ rel: "stylesheet", href: styles }];
}
