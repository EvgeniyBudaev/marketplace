import React from "react";
import type { ReactNode } from "react";
import clsx from "clsx";
import { DropDown, PopoverProvider, usePopover } from "~/uikit";

type TPopoverProps = {
  children?: ReactNode;
};

export const Popover = ({ children }: TPopoverProps) => {
  return (
    <PopoverProvider>
      <div className="Popover">{children}</div>
    </PopoverProvider>
  );
};

Popover.displayName = "Popover";

type TPopoverButtonProps = {
  className?: string;
  children?: ReactNode;
};

Popover.Button = Button;

function Button({ children, className }: TPopoverButtonProps): JSX.Element {
  const { onToggle } = usePopover();

  return (
    <div className={clsx("Popover-Button", className)} onClick={onToggle}>
      {children}
    </div>
  );
}

type TPopoverPanelProps = {
  className?: string;
  children?: ReactNode;
};

Popover.Panel = Panel;

function Panel({ children, className }: TPopoverPanelProps): JSX.Element {
  const { isOpen } = usePopover();
  console.log("Panel isOpen: ", isOpen);

  return (
    <DropDown className={clsx("Popover-Panel", className)} isOpen={isOpen}>
      {children}
    </DropDown>
  );
}
