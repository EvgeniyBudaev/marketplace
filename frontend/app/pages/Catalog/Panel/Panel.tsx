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
        {/*  <div className="Panel-SelectGroup">Select2</div>*/}
        <Sorting />
        <CardsSwitcher isCardsLine={isCardsLine} onCardsSwitcher={onCardsSwitcher} />
      </div>
    </div>
  );
};

export function panelLinks() {
  return [{ rel: "stylesheet", href: styles }];
}
