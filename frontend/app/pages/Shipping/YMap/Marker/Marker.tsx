import { useEffect } from "react";
import type { FC } from "react";
import clsx from "clsx";
import styles from "./Marker.css";

type TProps = {
  className?: string;
  isDragging?: boolean;
};

export const Marker: FC<TProps> = ({ className, isDragging }) => {
  useEffect(() => {}, []);

  return (
    <div
      className={clsx("Marker", className, {
        Marker__dragging: isDragging,
      })}
    >
      <div className="Marker-Header">
        <div className="Marker-Circle"></div>
      </div>
      <div className="Marker-Footer"></div>
    </div>
  );
};

export function markerLinks() {
  return [{ rel: "stylesheet", href: styles }];
}
