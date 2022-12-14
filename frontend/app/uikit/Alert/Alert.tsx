import { memo } from "react";
import type { FC } from "react";
import clsx from "clsx";
import styles from "./Alert.module.css";

export enum AlertType {
  Error = "Error",
  Success = "Success",
}

type TProps = {
  className?: string;
  description?: string;
  title?: string;
  type?: AlertType;
  onClose?: () => void;
};

const AlertComponent: FC<TProps> = ({ className, description, title }) => {
  return (
    <div className={clsx("Alert", className)}>
      <div className="Alert-Title">{title}</div>
      <div className="Alert-Description">{description}</div>
    </div>
  );
};

export const Alert = memo(AlertComponent);

export function alertLinks() {
  return [{ rel: "stylesheet", href: styles }];
}
