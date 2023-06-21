import type {FC} from "react";
import {formatProxy} from "~/utils";
import styles from "./TableCellImage.css";

type TProps = {
  image?: string | null;
}

export const TableCellImage: FC<TProps> = ({image}) => {
  return (
    <>
      <img className="TableCellImage" src={formatProxy(image ?? '')} alt={image ?? ''}/>
    </>
  )
}

export function tableCellImageLinks() {
  return [{rel: "stylesheet", href: styles}];
}