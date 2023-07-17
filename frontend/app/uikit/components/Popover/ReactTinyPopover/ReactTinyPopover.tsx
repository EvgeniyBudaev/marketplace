import React from "react";
import { Popover } from "react-tiny-popover";
import type { PopoverProps } from "react-tiny-popover";

export const ReactTinyPopover = (props: JSX.IntrinsicAttributes & PopoverProps) => {
  return <Popover {...props}>{props.children}</Popover>;
};
