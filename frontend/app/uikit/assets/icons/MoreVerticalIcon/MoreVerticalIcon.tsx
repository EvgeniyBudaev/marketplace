import { memo } from "react";
import type { FC, MouseEvent } from "react";
import type { TIconProps } from "../types";

type TProps = TIconProps & {
  className?: string;
  onClick?: (e: MouseEvent<HTMLOrSVGElement>) => void;
};

const MoreVerticalIconComponent: FC<TProps> = ({
  className,
  height = 24,
  width = 24,
  onClick,
  ...props
}) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    height={height}
    viewBox="0 -960 960 960"
    width={width}
    onClick={onClick}
    {...props}
  >
    <path d="M479.858-160Q460-160 446-174.142q-14-14.141-14-34Q432-228 446.142-242q14.141-14 34-14Q500-256 514-241.858q14 14.141 14 34Q528-188 513.858-174q-14.141 14-34 14Zm0-272Q460-432 446-446.142q-14-14.141-14-34Q432-500 446.142-514q14.141-14 34-14Q500-528 514-513.858q14 14.141 14 34Q528-460 513.858-446q-14.141 14-34 14Zm0-272Q460-704 446-718.142q-14-14.141-14-34Q432-772 446.142-786q14.141-14 34-14Q500-800 514-785.858q14 14.141 14 34Q528-732 513.858-718q-14.141 14-34 14Z" />
  </svg>
);

export const MoreVerticalIcon = memo(MoreVerticalIconComponent);
