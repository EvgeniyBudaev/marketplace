import { memo } from "react";
import type { FC } from "react";
import type { TIconProps } from "../types";

const IconComponent: FC<TIconProps> = ({ className, onClick, ...props }) => (
  <svg
    className={className}
    width="24"
    height="24"
    viewBox="0 0 8 16"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    onClick={onClick}
    {...props}
  >
    <path d="M0 14.5697L1.21337 16L8 8L1.21337 0L0 1.4303L5.57326 8L0 14.5697Z" />
  </svg>
);

export const ArrowRightIcon = memo(IconComponent);
