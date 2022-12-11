import { FC } from "react";
import styles from "./Sorting.module.css";

export const Sorting: FC = () => {
  return (
    <div className="Sorting">
      <span className="Sorting-Label">Сортировать</span>
    </div>
  );
};

export function sortingLinks() {
  return [{ rel: "stylesheet", href: styles }];
}
