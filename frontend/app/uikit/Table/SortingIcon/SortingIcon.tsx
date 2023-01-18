import { memo } from "react";
import type { FC } from "react";
import clsx from "clsx";
// import { SortingType } from "../Table";
import styles from "./SortingIcon.module.css";

export interface ISortingIconProps {
  className?: string;
  // sort?: SortingType;
  sort?: any;
  sortVariant?: string;
}

const SortingIconComponent: FC<ISortingIconProps> = ({ className, sort, sortVariant }) => {
  return (
    <div className={clsx("SortingIcon", className)}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" height="16px" width="16px">
        <polygon
          fill={sort === sortVariant ? "#000" : "none"}
          stroke="#000000"
          strokeWidth="2"
          strokeMiterlimit="10"
          points="16,5 24,13 8,13 "
        />
        <polygon
          fill={sort === `-${sortVariant}` ? "#000" : "none"}
          stroke="#000000"
          strokeWidth="2"
          strokeMiterlimit="10"
          points="16,27 8,19 24,19 "
        />
      </svg>
    </div>
  );
};

export const SortingIcon = memo(SortingIconComponent);

export function sortingIconLinks() {
  return [{ rel: "stylesheet", href: styles }];
}
