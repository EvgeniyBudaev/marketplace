import { memo } from "react";
import type { FC } from "react";
import type { TIconProps } from "../types";

const IconComponent: FC<TIconProps> = ({ height = 24, width = 24, ...props }) => (
  <svg
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    x="0px"
    y="0px"
    height={height}
    width={width}
    viewBox="0 0 292.074 292.073"
    {...props}
  >
    <g>
      <g>
        <path
          d="M190.166,182.858h-23.509c-4.863,0-8.814,3.945-8.814,8.814c0,4.876,3.951,8.815,8.814,8.815h23.509
				c4.864,0,8.821-3.939,8.821-8.815C198.987,186.798,195.03,182.858,190.166,182.858z"
        />
        <path
          d="M235.028,182.858h-24.235c-4.864,0-8.815,3.945-8.815,8.814c0,4.876,3.951,8.815,8.815,8.815h24.235
				c4.863,0,8.803-3.939,8.803-8.815C243.831,186.798,239.891,182.858,235.028,182.858z"
        />
        <path
          d="M60.415,106.727h77.5c4.871,0,8.815-3.942,8.815-8.812c0-4.875-3.944-8.817-8.815-8.817h-77.5
				c-4.87,0-8.818,3.942-8.818,8.817C51.596,102.784,55.544,106.727,60.415,106.727z"
        />
        <path
          d="M283.247,265.34h-11.518V116.655c0-4.87-3.957-8.818-8.821-8.818h-19.077V17.909c0-4.87-3.951-8.818-8.814-8.818h-24.235
				c-4.864,0-8.815,3.948-8.815,8.818v89.928h-7.752V17.909c0-4.87-3.957-8.818-8.821-8.818h-24.229
				c-4.863,0-8.809,3.948-8.809,8.818v89.928H29.166c-4.87,0-8.824,3.948-8.824,8.818V265.34H8.818c-4.875,0-8.818,3.945-8.818,8.827
				c0,4.87,3.942,8.815,8.818,8.815h20.348h31.249h77.5h125h20.344c4.864,0,8.815-3.945,8.815-8.815
				C292.067,269.279,288.123,265.34,283.247,265.34z M69.223,265.34v-64.857h59.862v64.857H69.223z"
        />
      </g>
    </g>
  </svg>
);

export const FactoryIcon = memo(IconComponent);
