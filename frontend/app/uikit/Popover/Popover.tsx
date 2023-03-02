import React from "react";
import type { PopoverProps } from "react-tiny-popover";
import { Popover as ReactTinyPopover } from "react-tiny-popover";

export const Popover = (props: JSX.IntrinsicAttributes & PopoverProps) => {
  return <ReactTinyPopover {...props}>{props.children}</ReactTinyPopover>;
};
