import { memo } from "react";
import type { FC } from "react";
import type { TIconProps } from "../types";

const IconComponent: FC<TIconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M15.409 5.747l3.756 2.53-.838 1.245-1.329-.895-.01 8.362-.746.002-3.902.01H3V8.628l-1.328.893-.837-1.244L9.37 2.535a1.138 1.138 0 011.27 0l3.268 2.202V3.008h1.5v2.739zm.09 1.87l-5.494-3.702L4.5 7.62V15.5h7.839l3.152-.007.009-7.876zM7.75 8.722h4.5v4.5h-4.5v-4.5zm1.5 1.5v1.5h1.5v-1.5h-1.5z"></path>
  </svg>
);

export const HouseIcon = memo(IconComponent);
