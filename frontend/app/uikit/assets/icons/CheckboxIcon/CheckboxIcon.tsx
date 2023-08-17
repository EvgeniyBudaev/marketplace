import { memo } from "react";
import type { FC } from "react";
import type { TIconProps } from "../types";

const IconComponent: FC<TIconProps> = ({ className, onClick, ...props }) => (
  <svg
    className={className}
    viewBox="0 0 10 8"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    onClick={onClick}
    {...props}
  >
    <path d="M1 3.88314L3 6L9 1" stroke="white" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const CheckboxIcon = memo(IconComponent);
