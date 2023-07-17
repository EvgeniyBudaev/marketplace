import type { ReactNode } from "react";

export type TPopoverPosition = "left" | "center" | "right";

export type TPopoverProps = {
  children?: ReactNode;
  dataTestId?: string;
  trigger: ReactNode | ReactNode[];
  position?: TPopoverPosition;
};
