import isNil from "lodash/isNil.js";
import type { FC } from "react";
import { useProxyUrl } from "#app/hooks";
import { Icon } from "#app/uikit";
import styles from "./TableCellImage.css";

type TProps = {
  image?: string | null;
};

export const TableCellImage: FC<TProps> = ({ image }) => {
  const { proxyUrl } = useProxyUrl();

  return (
    <>
      {!isNil(image) ? (
        <img className="TableCellImage" alt="" src={`${proxyUrl}${image}`} />
      ) : (
        <Icon type="NoImage" />
      )}
    </>
  );
};

export function tableCellImageLinks() {
  return [{ rel: "stylesheet", href: styles }];
}
