import { memo } from "react";
import type { FC } from "react";
import type { TIconProps } from "../types";

const IconComponent: FC<TIconProps> = ({
  height = 24,
  width = 24,
  ...props
}) => (
  <svg
    height={height}
    width={width}
    viewBox="0 0 21 20"
    fill="black"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M17.5386 19.7907L17.5121 6.84184L11.4146 17.5581H9.87695L3.77943 7.00929V19.7907H0.492065V0.255798H3.32874L10.6988 13.2046L17.9363 0.255798H20.773L20.7995 19.7907H17.5386Z" />
  </svg>
);

export const LogoShortIcon = memo(IconComponent);
