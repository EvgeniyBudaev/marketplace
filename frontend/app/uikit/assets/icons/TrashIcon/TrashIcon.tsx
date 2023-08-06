import { memo } from "react";
import type { FC, MouseEvent } from "react";
import type { TIconProps } from "../types";

type TProps = TIconProps & {
  className?: string;
  onClick?: (e: MouseEvent<HTMLOrSVGElement>) => void;
};

const IconComponent: FC<TProps> = ({ className, height = 24, width = 24, onClick, ...props }) => (
  <svg
    className={className}
    fill="currentColor"
    width={width}
    height={height}
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    onClick={onClick}
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M6.33333 0.5C5.41285 0.5 4.66666 1.24619 4.66666 2.16667V3.83333H3.00974C3.00388 3.83327 2.998 3.83327 2.99211 3.83333H1.33333C0.873096 3.83333 0.5 4.20643 0.5 4.66667C0.5 5.1269 0.873096 5.5 1.33333 5.5H2.23322L2.9392 13.9717C3.01118 14.8356 3.73329 15.5 4.60011 15.5H11.3999C12.2667 15.5 12.9888 14.8356 13.0608 13.9717L13.7668 5.5H14.6667C15.1269 5.5 15.5 5.1269 15.5 4.66667C15.5 4.20643 15.1269 3.83333 14.6667 3.83333H13.0079C13.002 3.83327 12.9961 3.83327 12.9902 3.83333H11.3333V2.16667C11.3333 1.24619 10.5871 0.5 9.66666 0.5H6.33333ZM9.66666 3.83333V2.16667H6.33333V3.83333H9.66666ZM12.0943 5.5H3.90566L4.60011 13.8333H11.3999L12.0943 5.5Z"
    ></path>
  </svg>
);

export const TrashIcon = memo(IconComponent);
