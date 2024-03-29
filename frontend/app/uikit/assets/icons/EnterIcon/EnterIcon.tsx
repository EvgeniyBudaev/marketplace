import { memo } from "react";
import type { FC } from "react";
import type { TIconProps } from "../types";

const IconComponent: FC<TIconProps> = (props) => (
  <svg
    height="512pt"
    viewBox="0 0 512 512"
    width="512pt"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="m512 60v392c0 33.085938-26.914062 60-60 60h-241c-33.085938 0-60-26.914062-60-60v-80h40v80c0 11.027344 8.972656 20 20 20h241c11.027344 0 20-8.972656 20-20v-392c0-11.027344-8.972656-20-20-20h-241c-11.027344 0-20 8.972656-20 20v80h-40v-80c0-33.085938 26.914062-60 60-60h241c33.085938 0 60 26.914062 60 60zm-299.285156 262 28.285156 28.285156 94.285156-94.285156-94.285156-94.285156-28.285156 28.285156 46 46h-258.714844v40h258.714844zm0 0" />
  </svg>
);

export const EnterIcon = memo(IconComponent);
