import { memo } from "react";
import type { FC } from "react";
import type { TIconProps } from "../types";

const IconComponent: FC<TIconProps> = (props) => (
  <svg fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M8.844 9.786l2.333 2.332 4.355-4.356 1.415 1.415-5.77 5.77L7.43 11.2l1.414-1.414zM3 2h18v7c0 5.726-2.89 10.076-8.549 12.936l-.451.227-.451-.227C5.89 19.076 3 14.726 3 9V2zm2 2v5c0 4.791 2.297 8.394 7 10.916 4.703-2.521 7-6.124 7-10.915V4H5z"></path>
  </svg>
);

export const DefenceIcon = memo(IconComponent);
