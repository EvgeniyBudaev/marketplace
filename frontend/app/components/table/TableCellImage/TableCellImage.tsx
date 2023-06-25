import isNil from "lodash/isNil";
import type {FC} from "react";
import {Icon} from "~/uikit";
import {formatProxy} from "~/utils";
import styles from "./TableCellImage.css";

type TProps = {
  image?: string | null;
}

export const TableCellImage: FC<TProps> = ({image}) => {
  return (
    <>
      {!isNil(image) ? (
        <img
          className="TableCellImage"
          alt=""
          src={formatProxy(image)}
        />
      ) : <Icon type="NoImage"/>
      }
    </>
  )
}

export function tableCellImageLinks() {
  return [{rel: "stylesheet", href: styles}];
}
