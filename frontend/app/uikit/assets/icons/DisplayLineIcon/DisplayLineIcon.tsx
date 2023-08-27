import { memo } from "react";
import type { FC } from "react";
import type { TIconProps } from "../types";

const IconComponent: FC<TIconProps> = ({ height = 24, width = 24, ...props }) => (
  <svg
    height={height}
    width={width}
    viewBox="0 0 20 20"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
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
      d="M12 12C11.4477 12 11 12.4477 11 13C11 13.5523 11.4477 14 12 14H18C18.5523 14 19 13.5523 19 13C19 12.4477 18.5523 12 18 12H12Z"
    ></path>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 1C11.4477 1 11 1.44772 11 2C11 2.55228 11.4477 3 12 3H18C18.5523 3 19 2.55228 19 2C19 1.44772 18.5523 1 18 1H12Z"
    ></path>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 16C11.4477 16 11 16.4477 11 17C11 17.5523 11.4477 18 12 18H16C16.5523 18 17 17.5523 17 17C17 16.4477 16.5523 16 16 16H12Z"
    ></path>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 5C11.4477 5 11 5.44772 11 6C11 6.55228 11.4477 7 12 7H16C16.5523 7 17 6.55228 17 6C17 5.44772 16.5523 5 16 5H12Z"
    ></path>
  </svg>
);

export const DisplayLineIcon = memo(IconComponent);
