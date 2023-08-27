import { memo } from "react";
import type { FC } from "react";
import type { TIconProps } from "../types";

export const MoreVerticalIconComponent: FC<TIconProps> = ({
  width = 24,
  height = 24,
  viewBox = "0 0 24 24",
  ...props
}) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect width={width} height={height} rx="8" />

    <path
      d="M11 18C11 17.4477 11.4477 17 12 17C12.5523 17 13 17.4477 13 18C13 18.5523 12.5523 19 12 19C11.4477 19 11 18.5523 11 18Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />

    <path
      d="M11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12C13 12.5523 12.5523 13 12 13C11.4477 13 11 12.5523 11 12Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />

    <path
      d="M11 6C11 5.44772 11.4477 5 12 5C12.5523 5 13 5.44772 13 6C13 6.55228 12.5523 7 12 7C11.4477 7 11 6.55228 11 6Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export const MoreVerticalIcon = memo(MoreVerticalIconComponent);
