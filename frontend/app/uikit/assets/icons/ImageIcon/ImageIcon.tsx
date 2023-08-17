import { memo } from "react";
import type { FC } from "react";
import type { TIconProps } from "../types";

const IconComponent: FC<TIconProps> = ({ className, onClick, ...props }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    height="24"
    viewBox="0 96 960 960"
    width="24"
    onClick={onClick}
    {...props}
  >
    <path d="M180 936q-24 0-42-18t-18-42V276q0-24 18-42t42-18h600q24 0 42 18t18 42v600q0 24-18 42t-42 18H180Zm0-60h600V276H180v600Zm56-97h489L578 583 446 754l-93-127-117 152Zm-56 97V276v600Z" />
  </svg>
);

export const ImageIcon = memo(IconComponent);
