import { FC } from "react";
import { CardsSwitcher } from "~/pages/Catalog/CardsSwitcher";
import styles from "./Panel.module.css";
import { Sorting } from "~/pages/Catalog/Sorting";

type TProps = {
  isCardsLine: boolean;
  onCardsSwitcher: () => void;
};

export const Panel: FC<TProps> = ({ isCardsLine, onCardsSwitcher }) => {
  return (
    <div className="Panel">
      <div className="Panel-Inner">
        <Sorting />
        <CardsSwitcher isCardsLine={isCardsLine} onCardsSwitcher={onCardsSwitcher} />
      </div>
    </div>
  );
};

export function panelLinks() {
  return [{ rel: "stylesheet", href: styles }];
}
