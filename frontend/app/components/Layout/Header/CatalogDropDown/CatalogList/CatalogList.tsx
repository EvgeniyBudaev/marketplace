import type { FC } from "react";
import isNil from "lodash/isNil";
import type { TCatalogs } from "~/shared/api/catalogs";
import { CatalogListItem } from "~/components/Layout/Header/CatalogDropDown/CatalogListItem";
import styles from "./CatalogList.module.css";

type TProps = {
  catalogs: TCatalogs;
};

export const CatalogList: FC<TProps> = ({ catalogs }) => {
  return (
    <ul className="CatalogList">
      {!isNil(catalogs) &&
        catalogs.content.map((item) => <CatalogListItem key={item.id} catalog={item} />)}
    </ul>
  );
};

export function catalogListLinks() {
  return [{ rel: "stylesheet", href: styles }];
}
