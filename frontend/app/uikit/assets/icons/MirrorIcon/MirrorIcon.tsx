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
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 441 441"
    enableBackground="new 0 0 441 441"
    onClick={onClick}
    {...props}
  >
    <g>
      <path d="M334.184,65.527C304.002,23.271,263.628,0,220.5,0c-43.128,0-83.502,23.271-113.685,65.527   C77.179,107.019,60.857,162.056,60.857,220.5s16.322,113.481,45.958,154.973C136.998,417.729,177.372,441,220.5,441   c43.127,0,83.501-23.271,113.684-65.527c29.637-41.492,45.958-96.529,45.958-154.973S363.821,107.019,334.184,65.527z M220.5,426   c-79.756,0-144.643-92.187-144.643-205.5S140.744,15,220.5,15s144.643,92.187,144.643,205.5S300.257,426,220.5,426z" />
      <path d="m303.481,87.458c-22.904-32.067-52.375-49.727-82.981-49.727s-60.077,17.66-82.981,49.727c-25.105,35.146-38.931,82.395-38.931,133.042 0,50.647 13.826,97.896 38.931,133.042 22.904,32.066 52.374,49.727 82.981,49.727s60.077-17.66 82.981-49.727c25.105-35.146 38.931-82.395 38.931-133.042 0-50.646-13.826-97.895-38.931-133.042zm-12.206,8.719c2.532,3.544 4.932,7.233 7.214,11.039l-161.424,216.783c-13.151-25.49-21.078-55.704-23.006-87.968l132.505-177.947c16.238,6.741 31.578,19.707 44.711,38.093zm-141.55,0c20.011-28.017 45.146-43.446 70.775-43.446 3.573,0 7.135,0.311 10.676,0.903l-117.425,157.694c1.542-44.032 14.177-84.635 35.974-115.151zm-4.504,241.986l161.107-216.357c3.345,6.975 6.31,14.277 8.885,21.854l-157.445,211.426c-2.76-3.206-5.446-6.626-8.043-10.262-1.549-2.17-3.048-4.393-4.504-6.661zm146.054,6.66c-20.011,28.016-45.146,43.445-70.775,43.445-18.18,0-36.11-7.772-52.141-22.286l152.117-204.277c4.557,18.541 6.935,38.352 6.935,58.794 0.001,47.548-12.833,91.7-36.136,124.324z" />
    </g>
  </svg>
);

export const MirrorIcon = memo(IconComponent);
