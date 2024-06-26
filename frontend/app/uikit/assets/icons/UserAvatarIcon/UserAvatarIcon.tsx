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
    viewBox="0 0 28 28"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M0.999947 19C2.49954 23.9987 8.00193 27.9978 14 28C19.998 27.9978 25.5004 23.9987 27 19C28.068 15.4403 23.2536 14.7087 20.8433 14.1877C20.3041 14.0708 19.7412 14.1745 19.2573 14.4395C18.1822 15.0283 16.0911 16 14 16C11.9089 16 9.81782 15.0283 8.7427 14.4395C8.25882 14.1745 7.69591 14.0708 7.15672 14.1877C4.74639 14.7087 -0.0679696 15.4403 0.999947 19Z"
      fill="currentColor"
    />
    <path
      d="M8.00002 6.017C8.00002 9.31444 10.7119 12 14 12C17.2881 12 20 9.31444 20 6.017C20 2.68556 17.2881 1.52588e-05 14 0C10.7119 1.43051e-05 8.00002 2.68556 8.00002 6.017Z"
      fill="currentColor"
    />
  </svg>
);

export const UserAvatarIcon = memo(IconComponent);
