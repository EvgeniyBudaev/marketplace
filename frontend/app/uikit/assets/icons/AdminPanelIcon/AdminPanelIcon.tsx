import { memo } from "react";
import type { FC } from "react";
import type { TIconProps } from "../types";

const AdminPanelIconComponent: FC<TIconProps> = ({
  height = 24,
  width = 24,
  ...props
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height={height}
    viewBox="0 -960 960 960"
    width={width}
    {...props}
  >
    <path d="M690.882-270q25.883 0 44-19Q753-308 753-333.882q0-25.883-18.118-44-18.117-18.118-44-18.118Q665-396 646-377.882q-19 18.117-19 44Q627-308 646-289q19 19 44.882 19ZM689.5-145q33.5 0 60.5-14t46-40q-26-14-51.962-21-25.961-7-54-7-28.038 0-54.538 7-26.5 7-51.5 21 19 26 45.5 40t60 14ZM480-80q-138-32-229-156.5T160-522v-239l320-120 320 120v270q-14-7-30-12.5t-30-7.5v-208l-260-96-260 96v197q0 76 24.5 140T307-269.5q38 48.5 84 80.5t89 46q6 12 18 27t20 23q-9 5-19 7.5T480-80Zm212.5 0Q615-80 560-135.5T505-267q0-78.435 54.99-133.717Q614.98-456 693-456q77 0 132.5 55.283Q881-345.435 881-267q0 76-55.5 131.5T692.5-80ZM480-479Z" />
  </svg>
);

export const AdminPanelIcon = memo(AdminPanelIconComponent);
