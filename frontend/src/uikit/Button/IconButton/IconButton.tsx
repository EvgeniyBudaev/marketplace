import React from "react";
import clsx from "clsx";
import { Button, Icon, IconType } from "src/uikit";
import { IButtonProps } from "../Button";
import classes from "./IconButton.module.scss";

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
      className={clsx(classes.IconButton, className)}
      isDisabled={isDisabled}
      onClick={onClick}
      {...rest}
    >
      <Icon type={typeIcon} />
    </Button>
  );
};
