import type { FC, MouseEvent } from "react";
import clsx from "clsx";
import type { IButtonProps, IconType } from "#app/uikit";
import { Button, Icon } from "#app/uikit";
import styles from "./IconButton.css";

interface IProps extends IButtonProps {
  className?: string;
  typeIcon: IconType;
  isDisabled?: boolean;
  onClick?: (e?: MouseEvent) => void;
}

export const IconButton: FC<IProps> = ({
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
