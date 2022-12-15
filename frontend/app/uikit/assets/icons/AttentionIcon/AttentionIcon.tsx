import { memo } from "react";
import type { FC, MouseEvent } from "react";
import type { TIconProps } from "../types";

type TProps = TIconProps & {
  className?: string;
  onClick?: (event: MouseEvent<HTMLOrSVGElement>) => void;
};

const IconComponent: FC<TProps> = ({ className, onClick, ...props }) => (
  <svg
    className={className}
    height="24px"
    width="24px"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    onClick={onClick}
    {...props}
  >
    <path d="M10 19a9 9 0 110-18 9 9 0 010 18zm0-16a7 7 0 100 14 7 7 0 000-14zm0 4.5a1 1 0 110-2 1 1 0 010 2zm0 7.5a1 1 0 01-1-1v-4a1 1 0 112 0v4a1 1 0 01-1 1z"></path>
  </svg>
);

export const AttentionIcon = memo(IconComponent);
