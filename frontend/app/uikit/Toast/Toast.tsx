import { memo } from "react";
import type { FC } from "react";
import clsx from "clsx";

export enum EToast {
  Error = "Error",
  Success = "Success",
}

type TProps = {
  className?: string;
  description?: string;
  title?: string;
  type?: EToast;
  onClose?: () => void;
};

const Component: FC<TProps> = ({ className, description, title }) => {
  return (
    <div className={clsx("Toast", className)}>
      <div className="Toast-Title">{title}</div>
      <div className="Toast-Description">{description}</div>
    </div>
  );
};

export const Toast = memo(Component);
