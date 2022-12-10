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
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    onClick={onClick}
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M2 13V18H7V13H2ZM1 11C0.447715 11 0 11.4477 0 12V19C0 19.5523 0.447715 20 1 20H8C8.55229 20 9 19.5523 9 19V12C9 11.4477 8.55229 11 8 11H1Z"
    ></path>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M2 2V7H7V2H2ZM1 0C0.447715 0 0 0.447715 0 1V8C0 8.55229 0.447715 9 1 9H8C8.55229 9 9 8.55229 9 8V1C9 0.447715 8.55229 0 8 0H1Z"
    ></path>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M13 2V7H18V2H13ZM12 0C11.4477 0 11 0.447715 11 1V8C11 8.55229 11.4477 9 12 9H19C19.5523 9 20 8.55229 20 8V1C20 0.447715 19.5523 0 19 0H12Z"
    ></path>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M13 13V18H18V13H13ZM12 11C11.4477 11 11 11.4477 11 12V19C11 19.5523 11.4477 20 12 20H19C19.5523 20 20 19.5523 20 19V12C20 11.4477 19.5523 11 19 11H12Z"
    ></path>
  </svg>
);

export const DisplayGridIcon = memo(IconComponent);
