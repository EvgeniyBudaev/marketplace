import type { FC } from "react";
import styles from "./CatalogListItem.module.css";
import { TCatalogsItem } from "~/shared/api/catalogs";

type TProps = {
  catalog: TCatalogsItem;
};

export const CatalogListItem: FC<TProps> = ({ catalog }) => {
  return (
    <li className="CatalogListItem">
      <div onClick={() => {}}>
        <img
          className="CatalogListItem-Image"
          alt={catalog.name}
          src={
            "https://www.semashko.com/sites/default/files/styles/250x375/public/no_photo_33.png?itok=fovz__Gi"
          }
        />
        <div className="CatalogListItem-Title">{catalog.name}</div>
      </div>
    </li>
  );
};

export function catalogListItemLinks() {
  return [{ rel: "stylesheet", href: styles }];
}
