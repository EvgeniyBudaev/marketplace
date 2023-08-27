import { memo } from "react";
import type { FC } from "react";
import type { TIconProps } from "../types";

const IconComponent: FC<TIconProps> = (props) => (
  <svg
    version="1.1"
    id="Layer_1"
    xmlns="http://www.w3.org/2000/svg"
    x="0px"
    y="0px"
    viewBox="0 0 256 256"
    enableBackground="new 0 0 256 256"
    xmlSpace="preserve"
    {...props}
  >
    <g>
      <path d="M56.4,235l13.7-79.7L12.1,98.8l80.1-11.6L128,14.6l35.8,72.5l80.1,11.6l-57.9,56.5l13.7,79.7L128,197.3L56.4,235z" />
    </g>
  </svg>
);

export const StarIcon = memo(IconComponent);
