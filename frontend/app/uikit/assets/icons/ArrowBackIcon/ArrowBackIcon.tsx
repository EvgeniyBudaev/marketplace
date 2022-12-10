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
      fillRule="evenodd"
      d="M20 11H7.824l5.583-5.583-1.414-1.414L3.996 12l7.997 7.997 1.414-1.414L7.824 13H20z"
    ></path>
  </svg>
);

export const ArrowBackIcon = memo(IconComponent);
