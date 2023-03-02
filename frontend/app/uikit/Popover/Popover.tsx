import React, { useEffect, useRef } from "react";
import type { ReactNode } from "react";
import clsx from "clsx";
import { DropDown, PopoverProvider, usePopover } from "~/uikit";
import styles from "./Popover.css";

type TPopoverProps = {
  children?: ReactNode;
  className?: string;
};

export const Popover = ({ children, className }: TPopoverProps) => {
  return (
    <PopoverProvider>
      <div className={clsx("Popover", className)}>{children}</div>
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
  // const { isOpen } = usePopover();
  // console.log(" Panel isOpen", isOpen);

  const refToggleDropDown = useRef<any>(null);
  const { isOpen, onClose } = usePopover();

  const handleClickOutsideDropDown = (event: MouseEvent) => {
    console.log("isOpen: ", isOpen);
    if (isOpen) {
      if (refToggleDropDown.current) {
        console.log("check: ", !refToggleDropDown.current.contains(event.target));
        if (!refToggleDropDown.current.contains(event.target)) {
          onClose();
        }
      }
    }
  };

  useEffect(() => {
    window.addEventListener("click", handleClickOutsideDropDown);
    return () => {
      window.removeEventListener("click", handleClickOutsideDropDown);
    };
  });

  return (
    <div ref={refToggleDropDown}>
      <DropDown className={clsx("Popover-Panel", className)} isOpen={isOpen}>
        {children}
      </DropDown>
    </div>
  );
}

export function popoverLinks() {
  return [{ rel: "stylesheet", href: styles }];
}
