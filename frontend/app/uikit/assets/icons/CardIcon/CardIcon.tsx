import { memo } from "react";
import type { FC, MouseEvent } from "react";
import type { TIconProps } from "../types";

type TProps = TIconProps & {
  className?: string;
  onClick?: (e: MouseEvent<HTMLOrSVGElement>) => void;
};

const IconComponent: FC<TProps> = ({ className, onClick, ...props }) => (
  <svg
    className={className}
    width="24"
    height="24"
    viewBox="0 0 24 24"
    onClick={onClick}
    {...props}
  >
    <path
      fill="currentColor"
      d="M20,8H4V6H20M20,18H4V12H20M20,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V6C22,4.89 21.1,4 20,4Z"
    />
  </svg>
);

export const CardIcon = memo(IconComponent);
