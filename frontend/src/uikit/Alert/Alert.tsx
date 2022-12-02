import React from "react";
import clsx from "clsx";
import classes from "./Alert.module.scss";

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

export const Alert: React.FC<TProps> = ({ className, description, title }) => {
  return (
    <div className={clsx(classes.Alert, className)}>
      <div className={classes.AlertTitle}>{title}</div>
      <div className={classes.AlertDescription}>{description}</div>
    </div>
  );
};
