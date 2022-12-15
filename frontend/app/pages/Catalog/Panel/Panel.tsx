import { FC } from "react";
import { CardsSwitcher } from "~/pages/Catalog/CardsSwitcher";
import styles from "./Panel.module.css";
import { Sorting } from "~/pages/Catalog/Sorting";
import { TSorting } from "~/types";

type TProps = {
  isCardsLine: boolean;
  onCardsSwitcher: () => void;
  onSorting: (data?: TSorting) => void;
};

export const Panel: FC<TProps> = ({ isCardsLine, onCardsSwitcher, onSorting }) => {
  return (
    <div className="Panel">
      <div className="Panel-Inner">
        <Sorting onSorting={onSorting} />
        <CardsSwitcher isCardsLine={isCardsLine} onCardsSwitcher={onCardsSwitcher} />
      </div>
    </div>
  );
};

export function panelLinks() {
  return [{ rel: "stylesheet", href: styles }];
}
