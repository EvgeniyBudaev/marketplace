import { FC } from "react";
import { CardsSwitcher } from "~/pages/Catalog/CardsSwitcher";
import styles from "./Panel.module.css";
import { Sorting } from "~/pages/Catalog/Sorting";
import { TSorting } from "~/types";

type TProps = {
  isCardsLine: boolean;
  onCardsSwitcher: () => void;
  onSortingChange: (data: TSorting["value"]) => void;
  sorting: TSorting["value"];
};

export const Panel: FC<TProps> = ({ isCardsLine, onCardsSwitcher, onSortingChange, sorting }) => {
  return (
    <div className="Panel">
      <div className="Panel-Inner">
        <Sorting onSortingChange={onSortingChange} sorting={sorting} />
        <CardsSwitcher isCardsLine={isCardsLine} onCardsSwitcher={onCardsSwitcher} />
      </div>
    </div>
  );
};

export function panelLinks() {
  return [{ rel: "stylesheet", href: styles }];
}
