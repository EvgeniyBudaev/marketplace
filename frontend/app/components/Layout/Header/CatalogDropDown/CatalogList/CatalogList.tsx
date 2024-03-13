import type { FC } from "react";
import isNil from "lodash/isNil.js";
import type { TCatalogs } from "~/shared/api/catalogs";
import { CatalogListItem } from "~/components/Layout/Header/CatalogDropDown/CatalogListItem";
import styles from "./CatalogList.css";

type TProps = {
  catalogs: TCatalogs;
  onClose: () => void;
};

export const CatalogList: FC<TProps> = ({ catalogs, onClose }) => {
  return (
    <ul className="CatalogList">
      {!isNil(catalogs) &&
        catalogs.content.map((item) => (
          <CatalogListItem key={item.id} catalog={item} onClose={onClose} />
        ))}
    </ul>
  );
};

export function catalogListLinks() {
  return [{ rel: "stylesheet", href: styles }];
}
