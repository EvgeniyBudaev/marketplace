import { memo } from "react";
import type { FC } from "react";
import type { TIconProps } from "../types";

const IconComponent: FC<TIconProps> = ({
  height = 24,
  width = 24,
  ...props
}) => (
  <svg height={height} width={width} viewBox="0 0 24 24" {...props}>
    <path
      fillRule="evenodd"
      d="M20 11H7.824l5.583-5.583-1.414-1.414L3.996 12l7.997 7.997 1.414-1.414L7.824 13H20z"
    ></path>
  </svg>
);

export const ArrowBackIcon = memo(IconComponent);
