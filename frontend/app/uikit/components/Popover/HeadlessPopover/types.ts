import type { ReactNode } from "react";
import type { TModifiers, TPlacement } from "~/uikit";

export type TPopoverPosition = "left" | "center" | "right";

export type TPopoverProps = {
  children?: ReactNode;
  classes?: TPopoverClasses;
  className?: string;
  dataTestId?: string;
  modifiers?: TModifiers;
  trigger: ReactNode | ReactNode[];
  placement?: TPlacement;
};

type TPopoverClasses = {
  popperContent?: string;
  popperElement?: string;
  referenceElement?: string;
};
