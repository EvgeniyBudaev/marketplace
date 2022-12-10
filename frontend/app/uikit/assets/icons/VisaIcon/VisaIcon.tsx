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
    version="1.2"
    baseProfile="tiny"
    id="Layer_1"
    xmlns="http://www.w3.org/2000/svg"
    x="0px"
    y="0px"
    viewBox="0 0 300 300"
    xmlSpace="preserve"
    onClick={onClick}
    {...props}
  >
    <g>
      <path
        d="M270.8,45.5H28.9c-13.4,0-24.2,10-24.2,22.3v163.8c0,12.3,10.8,22.3,24.2,22.3h241.8c13.4,0,24.2-10,24.2-22.3V67.8
		C295,55.5,284.2,45.5,270.8,45.5z M273.1,228.8c0,1.5-1.4,2.8-3,2.8H29.6c-1.7,0-3-1.3-3-2.8v-79.1h246.5V228.8z M273.1,90.1H26.6
		V70.6c0-1.5,1.4-2.8,3-2.8h240.4c1.7,0,3,1.3,3,2.8V90.1z"
      />
      <rect x="47.5" y="193.2" width="50.6" height="19.8" />
      <rect x="117.8" y="193.2" width="73.2" height="19.8" />
    </g>
  </svg>
);

export const VisaIcon = memo(IconComponent);
