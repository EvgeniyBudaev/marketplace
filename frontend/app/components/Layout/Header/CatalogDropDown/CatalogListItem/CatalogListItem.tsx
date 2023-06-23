import type {FC} from "react";
import {useNavigate} from "@remix-run/react";
// import type { TCatalogsItem } from "~/shared/api/catalogs";
import styles from "./CatalogListItem.css";
import {createPath, formatProxy} from "~/utils";
import {ERoutes} from "~/enums";
import {DEFAULT_IMAGE} from "~/constants";

type TProps = {
  catalog: any;
  onClose: () => void;
};

export const CatalogListItem: FC<TProps> = ({catalog, onClose}) => {
  const navigate = useNavigate();

  const handleRouteTo = () => {
    navigate(
      createPath({
        route: ERoutes.CatalogDetail,
        params: {alias: catalog.alias},
      }),
    );
    onClose();
  };

  return (
    <li className="CatalogListItem" onClick={handleRouteTo}>
      <img className="CatalogListItem-Image" alt={catalog.name} src={formatProxy(DEFAULT_IMAGE)}/>
      <div className="CatalogListItem-Title">{catalog.name}</div>
    </li>
  );
};

export function catalogListItemLinks() {
  return [{rel: "stylesheet", href: styles}];
}
