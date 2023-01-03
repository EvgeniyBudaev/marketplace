import type { FC } from "react";
import { Link, useNavigate } from "@remix-run/react";
import type { TCatalogsItem } from "~/shared/api/catalogs";
import styles from "./CatalogListItem.module.css";
import { createPath } from "~/utils";
import { ERoutes } from "~/enums";

type TProps = {
  catalog: TCatalogsItem;
  onClose: () => void;
};

export const CatalogListItem: FC<TProps> = ({ catalog, onClose }) => {
  const navigate = useNavigate();

  const handleRouteTo = () => {
    navigate(
      createPath({
        route: ERoutes.CatalogDetail,
        params: { alias: catalog.alias },
      }),
    );
    onClose();
  };

  return (
    <li className="CatalogListItem" onClick={handleRouteTo}>
      <img
        className="CatalogListItem-Image"
        alt={catalog.name}
        src={
          "https://www.semashko.com/sites/default/files/styles/250x375/public/no_photo_33.png?itok=fovz__Gi"
        }
      />
      <div className="CatalogListItem-Title">{catalog.name}</div>
    </li>
  );
};

export function catalogListItemLinks() {
  return [{ rel: "stylesheet", href: styles }];
}
