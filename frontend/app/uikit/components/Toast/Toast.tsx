import { memo } from "react";
import type { FC } from "react";
import clsx from "clsx";

export enum EToast {
  Error = "Error",
  Success = "Success",
}

type TProps = {
  className?: string;
  dataTestId?: string;
  description?: string;
  title?: string;
  type?: EToast;
  onClose?: () => void;
};

const ToastComponent: FC<TProps> = ({
  className,
  dataTestId = "uikit__toast",
  description,
  title,
}) => {
  return (
    <div className={clsx("Toast", className)} data-testid={dataTestId}>
      <div className="Toast-Title">{title}</div>
      <div className="Toast-Description">{description}</div>
    </div>
  );
};

export const Toast = memo(ToastComponent);
