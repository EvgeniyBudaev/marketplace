import { memo } from "react";
import type { FC } from "react";
import type { TIconProps } from "../types";

const IconComponent: FC<TIconProps> = ({ height = 48, width = 48, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height={height}
    viewBox="0 -960 960 960"
    width={width}
    {...props}
  >
    <path d="m880-167-60-59v-467H645l-73-87H388l-56 66-42-42 70-84h240l73 87h147q23 0 41.5 18.5T880-693v526ZM646-400 444-602q43-7 84.5 3.5T601-557q31 31 42 72.5t3 84.5Zm-187-15Zm117-55ZM207-753l60 60H140v513h554L26-848l43-43L876-84l-43 43-79-79H140q-24 0-42-18t-18-42v-513q0-24 18-42t42-18h67Zm155 197 43 43q-17 16-25.5 35.5T371-435q0 45 32 77t77 32q21.51 0 41.755-9T558-360l43 43q-24 25-55.473 38-31.474 13-65.527 13-70.417 0-119.708-49.292Q311-364.583 311-435q0-34.053 13-65.527Q337-532 362-556Z" />
  </svg>
);

export const NoImageIcon = memo(IconComponent);
