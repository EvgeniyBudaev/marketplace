import type { FC } from "react";
import type { TIconProps } from "../types";

export const RussianLanguageIcon: FC<TIconProps> = ({
  height = 24,
  width = 24,
  ...props
}) => (
  <svg
    height={height}
    width={width}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10Z"
      fill="#0052B5"
    />
    <path
      d="M21.371 8.5a10.004 10.004 0 0 0-9.37-6.5 10.004 10.004 0 0 0-9.37 6.5h18.74Z"
      fill="#fff"
    />
    <path
      d="M2.629 15.5a10.004 10.004 0 0 0 9.37 6.5c4.292 0 7.952-2.703 9.37-6.5H2.63Z"
      fill="#D90026"
    />
  </svg>
);
