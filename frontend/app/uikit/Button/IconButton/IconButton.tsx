import React from "react";
import clsx from "clsx";
import { Button, IButtonProps, Icon, IconType } from "~/uikit";
import styles from "./IconButton.module.css";

interface IProps extends IButtonProps {
  className?: string;
  typeIcon: IconType;
  isDisabled?: boolean;
  onClick?: (e?: React.MouseEvent) => void;
}

export const IconButton: React.FC<IProps> = ({
  className,
  typeIcon,
  isDisabled = false,
  onClick,
  ...rest
}) => {
  return (
    <Button
      className={clsx("IconButton", className)}
      isDisabled={isDisabled}
      onClick={onClick}
      {...rest}
    >
      <Icon type={typeIcon} />
    </Button>
  );
};

export function iconButtonLinks() {
  return [{ rel: "stylesheet", href: styles }];
}
