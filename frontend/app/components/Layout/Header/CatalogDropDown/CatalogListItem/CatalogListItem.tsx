import type { FC } from "react";
import { useNavigate } from "@remix-run/react";
// import type { TCatalogsItem } from "~/shared/api/catalogs";
import styles from "./CatalogListItem.css";
import { DEFAULT_IMAGE } from "~/constants";
import { useProxyUrl } from "~/hooks";
import { createPath } from "~/utils";
import { ERoutes } from "~/enums";

type TProps = {
  catalog: any;
  onClose: () => void;
};

export const CatalogListItem: FC<TProps> = ({ catalog, onClose }) => {
  const navigate = useNavigate();
  const { proxyUrl } = useProxyUrl();

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
        src={`${proxyUrl}${DEFAULT_IMAGE}`}
      />
      <div className="CatalogListItem-Title">{catalog.name}</div>
    </li>
  );
};

export function catalogListItemLinks() {
  return [{ rel: "stylesheet", href: styles }];
}
